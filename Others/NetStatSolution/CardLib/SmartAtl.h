#pragma once

#include <comdef.h>			// for _com_error and _bstr_t
#include <atlcom.h>			// ATL COM support
#include <atlsafe.h>			// for CComSafeArray
#include <atlsecurity.h>	// for CSid
#include <atlenc.h>	      // for Base64Encode/Base64Decode

#include <map>

#include "Loki/SmartPtr.h"	// for SmartPtr
#include "ErrorHandling.h"	// for error handling routines

#define SECURITY_WIN32
#include <security.h>        // for TranslateName

/////////////////////////////////////////////////////////////////////////////
// countof macro

#ifndef countof
#define countof(arr) (sizeof(arr)/sizeof(*arr))
#endif // countof

/////////////////////////////////////////////////////////////////////////////
// Helper macros for collection items iteration

#define FOR_EACH_VARIANT(vtItem, spItemsEnum) \
	if (spItemsEnum != NULL) for (_variant_t vtItem; spItemsEnum->Next(1, vtItem.GetAddress(), NULL) == S_OK;)

#define FOR_EACH_VARIANT_COLL_ENUM(vtItem, spColl, newEnum) \
	const IEnumVARIANTPtr spColl##Enum(spColl->newEnum); FOR_EACH_VARIANT(vtItem, spColl##Enum)

#define FOR_EACH_VARIANT_COLL(vtItem, spColl) \
	FOR_EACH_VARIANT_COLL_ENUM(vtItem, spColl, _NewEnum)

#define FOR_EACH_NODE(spNode, spNodeList) \
	if (spNodeList != NULL) for (MsXml::IXMLDOMNodePtr spNode; (spNode = spNodeList->nextNode()) != NULL;)

#define FOR_EACH_NODE_SKIP_SCHEMA(spNode, spNodeList) \
	if (spNodeList != NULL) spNodeList->nextNode(); if (spNodeList != NULL) for (MsXml::IXMLDOMNodePtr spNode; (spNode = spNodeList->nextNode()) != NULL;)

#define FOR_EACH_ITEM(_Collection_t, iter, spCollection) \
	if (spCollection != NULL) for (_Collection_t::const_iterator iter = spCollection->begin(), iter_end = spCollection->end(); iter != iter_end; ++iter)

namespace ATL
{

/////////////////////////////////////////////////////////////////////////////
// CComSafeArrayHolder helper class

// wrapper for SAFEARRAY. T is type stored (e.g. BSTR, VARIANT, etc.)
template <typename T, VARTYPE _vartype = _ATL_AutomationType<T>::type>
class CComSafeArrayHolder : public CComSafeArray<T, _vartype> 
{
public:
	// Constructors
	explicit CComSafeArrayHolder(const SAFEARRAY * psaSrc)
	{
		Attach(psaSrc);
	}

	~CComSafeArrayHolder() noexcept
	{
		Detach();
	} 
};

}; // namespace ATL

namespace Loki
{

/////////////////////////////////////////////////////////////////////////////
// ArraySPStorage class

template <class T>
class ArraySPStorage : public DefaultSPStorage<T>
{
public:
	ArraySPStorage() {}
	ArraySPStorage(const StoredType & p) : DefaultSPStorage<T>(p) {}

protected:
	void Destroy() { delete [] GetImplRef(*this); }
};

/////////////////////////////////////////////////////////////////////////////
// SmartArrPtr class

template <class T>
class SmartArrPtr : public Loki::SmartPtr<T, Loki::DestructiveCopy, Loki::AllowConversion, Loki::NoCheck, Loki::ArraySPStorage>
{
public:
	SmartArrPtr()
		: Loki::SmartPtr<T, Loki::DestructiveCopy, Loki::AllowConversion, Loki::NoCheck, Loki::ArraySPStorage>() {}

	SmartArrPtr(const StoredType & p)
		: Loki::SmartPtr<T, Loki::DestructiveCopy, Loki::AllowConversion, Loki::NoCheck, Loki::ArraySPStorage>(p) {}
};

/////////////////////////////////////////////////////////////////////////////
// SmartRefPtr class

template <class T>
class SmartRefPtr : public Loki::SmartPtr<T, Loki::RefCounted, Loki::AllowConversion, Loki::NoCheck, Loki::DefaultSPStorage>
{
public:
	SmartRefPtr()
		: Loki::SmartPtr<T, Loki::RefCounted, Loki::AllowConversion, Loki::NoCheck, Loki::DefaultSPStorage>() {}

	SmartRefPtr(const StoredType & p)
		: Loki::SmartPtr<T, Loki::RefCounted, Loki::AllowConversion, Loki::NoCheck, Loki::DefaultSPStorage>(p) {}
};

/////////////////////////////////////////////////////////////////////////////
// SmartRefMTPtr class

template <class T>
class SmartRefMTPtr : public Loki::SmartPtr<T, Loki::RefCountedMTAdj<Loki::ClassLevelLockable>::RefCountedMT, Loki::AllowConversion, Loki::NoCheck, Loki::DefaultSPStorage>
{
public:
	SmartRefMTPtr()
		: Loki::SmartPtr<T, Loki::RefCountedMTAdj<Loki::ClassLevelLockable>::RefCountedMT, Loki::AllowConversion, Loki::NoCheck, Loki::DefaultSPStorage>() {}

	SmartRefMTPtr(const StoredType & p)
		: Loki::SmartPtr<T, Loki::RefCountedMTAdj<Loki::ClassLevelLockable>::RefCountedMT, Loki::AllowConversion, Loki::NoCheck, Loki::DefaultSPStorage>(p) {}
};

/////////////////////////////////////////////////////////////////////////////
// LocalSPStorage class

template <class T>
class LocalSPStorage : public DefaultSPStorage<T>
{
public:
	LocalSPStorage() {}
	LocalSPStorage(const StoredType & p) : DefaultSPStorage<T>(p) {}

protected:
	void Destroy() { ::LocalFree(GetImplRef(*this)); }
};

/////////////////////////////////////////////////////////////////////////////
// SmartLocalPtr class

template <class T>
class SmartLocalPtr : public Loki::SmartPtr<T, Loki::DestructiveCopy, Loki::AllowConversion, Loki::NoCheck, Loki::LocalSPStorage>
{
public:
	SmartLocalPtr()
		: Loki::SmartPtr<T, Loki::DestructiveCopy, Loki::AllowConversion, Loki::NoCheck, Loki::LocalSPStorage>() {}

	SmartLocalPtr(const StoredType & p)
		: Loki::SmartPtr<T, Loki::DestructiveCopy, Loki::AllowConversion, Loki::NoCheck, Loki::LocalSPStorage>(p) {}
};

};	// namespace Loki

namespace Helpers
{
	using namespace std;
	using namespace ATL;
	using namespace Loki;

/////////////////////////////////////////////////////////////////////////////
// TEMPLATE FUNCTION for_each_elem for CComSafeArray iteration

template <typename _Elem, class _Fn>
inline void for_each_elem(const CComSafeArray<_Elem>& csa, _Fn& func) throw(...)
{
	// perform function for each element in array
	for (LONG i = csa.GetLowerBound(), last = i + csa.GetCount(); i < last; func(csa[i++])); // NOTE: loop w/o body
}

/////////////////////////////////////////////////////////////////////////////
// CreateAtlComObject helper function

template <typename _AtlComObject> CComObject<_AtlComObject>* CreateAtlComObject()
{
	CComObject<_AtlComObject>* pObject = 0;
	CheckComError(CComObject<_AtlComObject>::CreateInstance(&pObject));
	return pObject;
}

template <typename _AtlComObject> CComAggObject<_AtlComObject>* CreateAtlComAggObject(IUnknown* pOuterUnk)
{
	CComAggObject<_AtlComObject>* pObject = 0;
	CheckComError(CComAggObject<_AtlComObject>::CreateInstance(pOuterUnk, &pObject));
	return pObject;
}

/////////////////////////////////////////////////////////////////////////////
// AtlLoadString helper function

inline _bstr_t AtlLoadString(UINT uID)
{
	_bstr_t sString;
	if (!CComBSTR::LoadStringResource(uID, sString.GetBSTR()))
		RaiseComError(E_OUTOFMEMORY);
	return sString;
}

/////////////////////////////////////////////////////////////////////////////
// AtlBase64EncodeString/AtlBase64DecodeString helper functions

ATL_NOINLINE inline _bstr_t AtlBase64EncodeString(const _bstr_t & sData)
{
	int nSrcLength = sData.length() * sizeof(TCHAR);
	int nEncLength = Base64EncodeGetRequiredLength(nSrcLength);
	SmartArrPtr<char> saEncData(new char[nEncLength]);

	if (!Base64Encode(reinterpret_cast<const BYTE *>(static_cast<LPCTSTR>(sData)), nSrcLength, static_cast<LPSTR>(saEncData), &nEncLength))
		RaiseComError(E_FAIL);

	return static_cast<LPSTR>(saEncData);
}

ATL_NOINLINE inline _bstr_t AtlBase64DecodeString(const _bstr_t & sData)
{
	int nSrcLength = sData.length();
	int nDecLength = Base64DecodeGetRequiredLength(nSrcLength);
	SmartArrPtr<BYTE> saDecData(new BYTE[nDecLength]);

	if (!Base64Decode(LPCSTR(sData), nSrcLength, static_cast<LPBYTE>(saDecData), &nDecLength))
		RaiseComError(E_FAIL);

	return reinterpret_cast<LPCTSTR>(static_cast<LPBYTE>(saDecData));
}

/////////////////////////////////////////////////////////////////////////////
// FormatResourceString helper function

ATL_NOINLINE inline _bstr_t FormatResourceString(UINT nID, ...)
{
	_bstr_t sFormat(AtlLoadString(nID)); // load format string from resources

	va_list arglist;
	va_start(arglist, nID); // initialize variable arguments

	// count a number of characters in the string referenced by a list of arguments
	// and allocate corresponding buffer (include the terminating null character)
	SmartArrPtr<TCHAR> saBuffer(new TCHAR[::_vsctprintf(sFormat, arglist) + 1]);
	if (static_cast<TCHAR*>(saBuffer) == NULL)
		RaiseComError(E_OUTOFMEMORY);

	::_vstprintf(saBuffer, sFormat, arglist);	// write formatted output to the buffer

	va_end(arglist); // reset variable arguments

	return sFormat = saBuffer;	// reuse format string for formatted output
}

/////////////////////////////////////////////////////////////////////////////
// SafeArrayCopyMemory helper function

inline HRESULT SafeArrayCopyMemory(SAFEARRAY* psa, const void* pmem, size_t length) noexcept
{
	ATLASSERT(psa && pmem);
	ATLASSERT(!::IsBadReadPtr(pmem, length));

	if (!psa || !pmem) return E_POINTER;

	HRESULT hr = E_FAIL;

	void* pData = NULL;
	if (SUCCEEDED(hr = ::SafeArrayAccessData(psa, &pData)))
	{
		::memcpy(pData, pmem, length);
		hr = ::SafeArrayUnaccessData(psa);
	}

	return hr;
}

/////////////////////////////////////////////////////////////////////////////
// SafeArrayReadMemory helper function

inline HRESULT SafeArrayReadMemory(SAFEARRAY* psa, void* pmem, size_t length) noexcept
{
	ATLASSERT(psa && pmem);
	ATLASSERT(!::IsBadWritePtr(pmem, length));

	if (!psa || !pmem) return E_POINTER;

	HRESULT hr = E_FAIL;

	void* pData = NULL;
	if (SUCCEEDED(hr = ::SafeArrayAccessData(psa, &pData)))
	{
		::memcpy(pmem, pData, length);
		hr = ::SafeArrayUnaccessData(psa);
	}

	return hr;
}

/////////////////////////////////////////////////////////////////////////////
// SafeArrayGetCount helper function

inline HRESULT SafeArrayGetCount(SAFEARRAY* psa, int ndim, size_t* plength) noexcept
{
	ATLASSERT(psa && plength);
	ATLASSERT(!::IsBadWritePtr(plength, sizeof(size_t)));

	if (!psa || !plength) return E_POINTER;

	HRESULT hr = E_FAIL;
	LONG lLBound, lUBound;

	*plength = 0;

	if (SUCCEEDED(hr = ::SafeArrayGetLBound(psa, ndim + 1, &lLBound)))
	{
		if (SUCCEEDED(hr = ::SafeArrayGetUBound(psa, ndim + 1, &lUBound)))
		{
			*plength = lUBound - lLBound + 1;
		}
	}

	return hr;
}

/////////////////////////////////////////////////////////////////////////////
// SafeArrayCreateBinary helper function

inline HRESULT SafeArrayCreateBinary(const void* pmem, size_t length, SAFEARRAY** ppsa) noexcept
{
	ATLASSERT(pmem);
	ATLASSERT(!::IsBadReadPtr(pmem, length));
	ATLASSERT(!::IsBadWritePtr(ppsa, sizeof(SAFEARRAY*)));

	*ppsa = NULL;

	HRESULT hr = S_OK;

	SAFEARRAYBOUND bound = { (ULONG)length, 0 };
	SAFEARRAY* psa = ::SafeArrayCreate(VT_UI1, 1, &bound);

	if (psa != NULL)
	{
		if (SUCCEEDED(hr = SafeArrayCopyMemory(psa, pmem, (ULONG)length)))
		{
			*ppsa = psa;
		}
		else
		{
			::SafeArrayDestroy(psa);
		}
	}
	else
	{
		hr = E_OUTOFMEMORY;
	}

	return hr;
}

/////////////////////////////////////////////////////////////////////////////
// VariantGetCount helper function

inline HRESULT VariantGetCount(VARIANT* pv, size_t* plength) noexcept
{
	ATLASSERT(pv);
	ATLASSERT(!::IsBadReadPtr(pv, sizeof(VARIANT)));
	ATLASSERT(!::IsBadWritePtr(plength, sizeof(size_t)));

	if (!pv) return E_POINTER;
	HRESULT hr = S_OK;

	switch (V_VT(pv))
	{
	case VT_BSTR:
		*plength = ::SysStringByteLen(V_BSTR(pv));
		break;
	case (VT_ARRAY | VT_UI1):	// SAFEARRAY(BYTE)
		hr = SafeArrayGetCount(V_ARRAY(pv), 0, plength);
		break;
	default:
		hr = E_INVALIDARG;
		break;
	}

	return hr;
}

/////////////////////////////////////////////////////////////////////////////
// VariantAccessData helper function

inline HRESULT VariantAccessData(VARIANT* pv, void** ppmem) noexcept
{
	ATLASSERT(pv);
	ATLASSERT(!::IsBadReadPtr(pv, sizeof(VARIANT)));
	ATLASSERT(!::IsBadWritePtr(ppmem, sizeof(void*)));

	if (!pv) return E_POINTER;
	HRESULT hr = S_OK;

	switch (V_VT(pv))
	{
	case VT_BSTR:
		*ppmem = V_BSTR(pv);
		break;
	case (VT_ARRAY | VT_UI1):	// SAFEARRAY(BYTE)
		hr = ::SafeArrayAccessData(V_ARRAY(pv), ppmem);
		break;
	default:
		hr = E_INVALIDARG;
		break;
	}

	return hr;
}

/////////////////////////////////////////////////////////////////////////////
// VariantUnaccessData helper function

inline HRESULT VariantUnaccessData(VARIANT* pv) noexcept
{
	ATLASSERT(pv);
	ATLASSERT(!::IsBadReadPtr(pv, sizeof(VARIANT)));

	if (!pv) return E_POINTER;
	HRESULT hr = S_OK;

	switch (V_VT(pv))
	{
	case VT_BSTR:
		// nothing to do
		break;
	case (VT_ARRAY | VT_UI1):	// SAFEARRAY(BYTE)
		hr = ::SafeArrayUnaccessData(V_ARRAY(pv));
		break;
	default:
		hr = E_INVALIDARG;
		break;
	}

	return hr;
}

/////////////////////////////////////////////////////////////////////////////
// BufferToVariant helper function

ATL_NOINLINE inline HRESULT BufferToVariant(const void* pmem, size_t length, VARIANT* pv) noexcept
{
	ATLASSERT(pmem && pv);
	ATLASSERT(!::IsBadWritePtr(pv, sizeof(VARIANT)));

	if (!pmem || !pv) return E_POINTER;

	HRESULT hr = E_FAIL;
	ATLTRY(hr = ::VariantClear(pv));

	if (SUCCEEDED(hr))
	{
		SAFEARRAYBOUND bound = { (ULONG)length, 0 };
		SAFEARRAY* psa = ::SafeArrayCreate(VT_UI1, 1, &bound);

		if (psa != NULL)
		{
			if (SUCCEEDED(hr = SafeArrayCopyMemory(psa, pmem, length)))
			{
				V_VT(pv) = VT_ARRAY | VT_UI1;
				V_ARRAY(pv) = psa;
			}
			else
			{
				::SafeArrayDestroy(psa);
			}
		}
		else
		{
			hr = E_OUTOFMEMORY;
		}
	}

	return hr;
}

/////////////////////////////////////////////////////////////////////////////
// VariantToBuffer helper function

ATL_NOINLINE inline HRESULT VariantToBuffer(const VARIANT* pv, void** ppmem, size_t* plength) noexcept
{
	ATLASSERT(pv && ppmem && plength);
	ATLASSERT(!::IsBadReadPtr(pv, sizeof(VARIANT)));
	ATLASSERT(!::IsBadWritePtr(ppmem, sizeof(void*)));
	ATLASSERT(!::IsBadWritePtr(plength, sizeof(size_t)));

	if (!pv || !ppmem || !plength) return E_POINTER;

	HRESULT hr = E_FAIL;
	*ppmem = NULL;
	*plength = 0;

	switch (V_VT(pv))
	{
	default:
		hr = E_INVALIDARG;
		break;

	case VT_BSTR:
		{
			*plength = ::SysStringByteLen(V_BSTR(pv));
			if (*plength > 0)
			{
				ATLTRY(*ppmem = new BYTE[*plength]);
				if (*ppmem != NULL)
				{
					::memcpy(*ppmem, V_BSTR(pv), *plength);
				}
				else
				{
					hr = E_OUTOFMEMORY;
				}
			}
		}
		break;

	case (VT_ARRAY | VT_UI1):	// SAFEARRAY(BYTE)
		{
			SAFEARRAY* psa = V_ARRAY(pv);
			if (SUCCEEDED(hr = SafeArrayGetCount(psa, 0, plength)))
			{
				ATLTRY(*ppmem = new BYTE[*plength]);
				if (*ppmem != NULL)
				{
					if (FAILED(hr = SafeArrayReadMemory(psa, *ppmem, *plength)))
					{
						delete [] *ppmem;
						*ppmem = NULL;
					}
				}
				else
				{
					hr = E_OUTOFMEMORY;
				}
			}
		}
		break;
	}

	return hr;
}

/////////////////////////////////////////////////////////////////////////////
// SafeArrayData helper class

template <typename T>
class SafeArrayData
{
public:
	SafeArrayData(SAFEARRAY* psa)
	{
		ATLASSERT(psa);
		m_psa = psa;

		CheckComError(::SafeArrayAccessData(m_psa, reinterpret_cast<void**>(&m_p)));
	}

	~SafeArrayData() noexcept
	{
		::SafeArrayUnaccessData(m_psa);
	}

	size_t GetCount(int dim = 0) const
	{
		size_t count = 0;
		CheckComError(SafeArrayGetCount(m_psa, dim, &count));

		return count;
	}

	VARTYPE GetType() const
	{
		VARTYPE varType = 0;
		CheckComError(::SafeArrayGetVartype(m_psa, &varType));

		return varType;
	}

	T* GetData() const noexcept
	{
		return m_p;
	}

	operator T*() const noexcept
	{
		return m_p;
	}

private:
	SAFEARRAY* m_psa;
	T* m_p;
};

/////////////////////////////////////////////////////////////////////////////
// COM/OLE smart initialization helper classes

class CCoInitializer
{
public:
	CCoInitializer(COINIT dwCoInit = COINIT_APARTMENTTHREADED) noexcept { ::CoInitializeEx(0, dwCoInit); }
	~CCoInitializer() noexcept { ::CoUninitialize(); }
};

class COleInitializer
{
public:
	COleInitializer() noexcept { ::OleInitialize(0); }
	~COleInitializer() noexcept { ::OleUninitialize(); }
};

/////////////////////////////////////////////////////////////////////////////
// CSidCache helper class

template <class _Sid = CSid>
class CSidCacheT
{
	typedef map<_bstr_t, _Sid> CSidMap;

public:
	CSidCacheT(LPCTSTR pszSystem = NULL) throw()
		: m_pszSystem(pszSystem)
	{
	}

	const _Sid& LookupSid(const _bstr_t& sAccountName) throw(...)
	{
		CSidMap::const_iterator it = m_Sids.find(sAccountName);
		if (it != m_Sids.end())
			return it->second;

		_Sid cachedSid(sAccountName, m_pszSystem);

		CSidMap::_Pairib pair = m_Sids.insert(CSidMap::value_type(sAccountName, cachedSid));
		return pair.first->second;
	}

	const _bstr_t& LookupAccountName(const CSid& sid) throw(...)
	{
		for (CSidMap::const_iterator it = m_Sids.begin(), end = m_Sids.end(); it != end; ++it)
		{
			if (it->second == sid)
				return it->first;
		}

		_Sid cachedSid(sid, m_pszSystem);

		CSidMap::_Pairib pair = m_Sids.insert(CSidMap::value_type(GetAccountName(cachedSid), cachedSid));
		return pair.first->first;
	}

private:
	_bstr_t GetAccountName(const CSid& sid) throw(...)
	{
		_bstr_t sAccount(sid.Domain());
		if (sAccount.length())
			sAccount += L"\\";
		sAccount += sid.AccountName();
		return sAccount;
	}

private:
	LPCTSTR m_pszSystem;
	CSidMap m_Sids;
};

typedef CSidCacheT<CSid> CSidCache;

/////////////////////////////////////////////////////////////////////////////
// CTrusteeSid helper class

class CTrusteeSid : public CSid
{
public:
	CTrusteeSid() throw();
	CTrusteeSid(const CSid& rhs, LPCTSTR pszSystem = NULL) throw(...);
	explicit CTrusteeSid(LPCTSTR pszAccountName, LPCTSTR pszSystem = NULL) throw(...);

	bool LoadAccount(LPCTSTR pszAccountName, LPCTSTR pszSystem = NULL) throw(...);
};

inline CTrusteeSid::CTrusteeSid() throw()
{
}

inline CTrusteeSid::CTrusteeSid(const CSid& rhs, LPCTSTR pszSystem) throw(...)
	: CSid(rhs, pszSystem)
{
}

inline CTrusteeSid::CTrusteeSid(LPCTSTR pszAccountName, LPCTSTR pszSystem) throw(...)
{
	if (!LoadAccount(pszAccountName, pszSystem))
		AtlThrowLastWin32();
}

inline bool CTrusteeSid::LoadAccount(LPCTSTR pszAccountName, LPCTSTR pszSystem) throw(...)
{
	SID * pSid = 0;

#if (_WIN32_WINNT >= 0x0500)
	// check if a string-format SID was passed as account name
	// try to convert a string-format SID into a valid, functional SID
	bool bResult = ::ConvertStringSidToSid(pszAccountName, reinterpret_cast<PSID*>(&pSid))
		? CSid::LoadAccount(pSid, pszSystem)
		: CSid::LoadAccount(pszAccountName, pszSystem);
#else
	bool bResult = CSid::LoadAccount(pszAccountName, pszSystem);
#endif

	if (pSid)
		::LocalFree(pSid);

	return bResult;
}

typedef CSidCacheT<CTrusteeSid> CTrusteeSidCache;

/////////////////////////////////////////////////////////////////////////////
// CTransSid helper class

#if (_WIN32_WINNT >= 0x0500)
#define SECURITY_WIN32
#include <security.h>
#pragma comment(lib, "secur32.lib")

class CTransSid : public CTrusteeSid
{
public:
	CTransSid() throw();
	CTransSid(const CSid& rhs, LPCTSTR pszSystem = NULL) throw(...);
	explicit CTransSid(LPCTSTR pszAccountName, LPCTSTR pszSystem = NULL) throw(...);

	LPCTSTR DisplayName() const throw(...);
	LPCTSTR LogonName() const throw(...);

private:
	void GetAccountFriendlyName() const throw(...);
	void GetUserFriendlyName(LPCTSTR pszAccountName) const throw(...);
	void TranslateNameHelper(LPCTSTR pszAccountName,
		EXTENDED_NAME_FORMAT AccountNameFormat,
		EXTENDED_NAME_FORMAT DesiredNameFormat,
		CString & strTranslatedName) const throw(...);

	mutable CString m_strDisplayName;
	mutable CString m_strLogonName;
};

inline CTransSid::CTransSid() throw()
{
}

inline CTransSid::CTransSid(const CSid& rhs, LPCTSTR pszSystem) throw(...)
	: CTrusteeSid(rhs, pszSystem)
{
}

inline CTransSid::CTransSid(LPCTSTR pszAccountName, LPCTSTR pszSystem) throw(...)
	: CTrusteeSid(pszAccountName, pszSystem)
{
}

inline LPCTSTR CTransSid::DisplayName() const throw(...)
{
	if (m_strDisplayName.IsEmpty())
		GetAccountFriendlyName();

	return m_strDisplayName;
}

inline LPCTSTR CTransSid::LogonName() const throw(...)
{
	if (m_strLogonName.IsEmpty())
		GetAccountFriendlyName();

	return m_strLogonName;
}

inline void CTransSid::GetAccountFriendlyName() const throw(...)
{
	// start with NT4 "DOMAIN\user" style name
	m_strDisplayName = AccountName();
	m_strLogonName = ::_tcslen(Domain())
		? CString(Domain()) + _T("\\") + m_strDisplayName
		: m_strDisplayName;

	// and adjust names based on SID type
	switch (SidNameUse())
	{
	case SidTypeUser:
   case SidTypeGroup:
		GetUserFriendlyName(m_strLogonName);
		break;
   case SidTypeWellKnownGroup:
      // no logon name
		GetUserFriendlyName(m_strLogonName);
		m_strLogonName = _T("");
      break;
   case SidTypeDeletedAccount:
		// TODO: load from resources
		m_strDisplayName = _T("Account Deleted");
		m_strLogonName = _T("");
		break;
   case SidTypeComputer:
		// cut the trailing '$'
		m_strDisplayName.TrimRight(_T('$'));
		break;
	default:
      // do nothing
		break;
	}
}

inline void CTransSid::TranslateNameHelper(LPCTSTR pszAccountName,
								 EXTENDED_NAME_FORMAT AccountNameFormat,
								 EXTENDED_NAME_FORMAT DesiredNameFormat,
								 CString & strTranslatedName) const throw()
{
	ULONG cch = MAX_PATH;

	while (!::TranslateName(pszAccountName,
                           AccountNameFormat,
                           DesiredNameFormat,
                           strTranslatedName.GetBuffer(cch),
                           &cch))
   {
      if (GetLastError() == ERROR_INSUFFICIENT_BUFFER)
			strTranslatedName.ReleaseBuffer();
      else
			break;
   }

	strTranslatedName.ReleaseBuffer();
}

inline void CTransSid::GetUserFriendlyName(LPCTSTR pszAccountName) const throw()
{
   CString strDisplayName, strLogonName;

	TranslateNameHelper(pszAccountName, NameSamCompatible, NameDisplay, strDisplayName);
	TranslateNameHelper(pszAccountName, NameSamCompatible, NameUserPrincipal, strLogonName);

   if (!strDisplayName.IsEmpty())
      m_strDisplayName = strDisplayName;

   if (!strLogonName.IsEmpty())
      m_strLogonName = strLogonName;
}

typedef CSidCacheT<CTransSid> CTransSidCache;

#endif // _WIN32_WINNT

};	// namespace Helpers
