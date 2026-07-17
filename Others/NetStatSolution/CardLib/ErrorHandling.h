// Helpers.h : Declaration of the common error handling routines
#pragma once

#include <comdef.h>     // for _com_error and _bstr_t
#include <atlbase.h>    // for CComPtr<>
#include <atlstr.h>     // for CStringT<>

/////////////////////////////////////////////////////////////////////////////
//                             Helper defines                              //
/////////////////////////////////////////////////////////////////////////////

#ifndef ATL_NORETURN
	#define ATL_NORETURN __declspec(noreturn)
#endif

#ifndef ATL_FORCEINLINE
	#define ATL_FORCEINLINE __forceinline
#endif

// ISupportErrorInfo
#define BEGIN_ERRORINFO_MAP() \
	STDMETHOD(InterfaceSupportsErrorInfo)(REFIID riid) { \
		static const IID* arr[] = {
#define INTERFACE_SUPPORT_ERROR_INFO(x) \
			&__uuidof(x),
#define END_ERRORINFO_MAP() \
			NULL}; \
		for (int i = 0; arr[i] != NULL; ++i) \
			if (::InlineIsEqualGUID(*arr[i], riid)) \
				return S_OK; \
		return S_FALSE; \
	}

// Method arguments checking
#define CHECK_PTR(pv) \
	do { \
		ATLASSERT(!Helpers::IsBadReadPtr(pv)); \
		if (!(pv)) \
			Helpers::RaiseComError(E_POINTER); \
	} while (0)

#define CHECK_OUT_PTR(pv) \
	do { \
		ATLASSERT(!Helpers::IsBadWritePtr(pv)); \
		if (!(pv)) \
			Helpers::RaiseComError(E_POINTER); \
		Helpers::ClearValue(pv); \
	} while (0)

#define CHECK_BUFFER(pv, ucb) \
	do { \
		ATLASSERT(!Helpers::IsBadReadPtr(pv, cb)); \
		if (!(pv)) \
			Helpers::RaiseComError(E_POINTER); \
	} while (0)

#define CHECK_OUT_BUFFER(pv, ucb) \
	do { \
		ATLASSERT(!Helpers::IsBadWritePtr(pv, cb)); \
		if (!(pv)) \
			Helpers::RaiseComError(E_POINTER); \
		Helpers::ClearValue(pv, cb); \
	} while (0)

/////////////////////////////////////////////////////////////////////////////
//           Standard COM error handling for the ATL objects               //
/////////////////////////////////////////////////////////////////////////////

// Template for method start
#define COM_METHOD_START() PROFILE_BEGIN_METHOD(); HRESULT __hr = S_OK;

// Template for object locking
#define COM_LOCK_OBJECT() ObjectLock lock(this);
#define COM_LOCK_OBJECT_EX(ClassName) ClassName::ObjectLock lock(static_cast<ClassName*>(this));

// Template for catching _com_error exception
#define COM_CATCH_ERROR() catch (const _com_error& e) { __hr = ReportError(e); }
#define COM_CATCH_ERROR_EX(ClassName) catch (const _com_error& e) { __hr = static_cast<ClassName*>(this)->ReportError(e); }

// Template for catching CAtlException exception
#define COM_CATCH_ATLERROR() catch (const ATL::CAtlException& e) { __hr = ReportError(e); }
#define COM_CATCH_ATLERROR_EX(ClassName) catch (const ATL::CAtlException& e) { __hr = static_cast<ClassName*>(this)->ReportError(e); }

// Template for catching all exception i.e. AV
#ifdef DV_CONVERT_SEH_EXCEPTIONS
	#define COM_CATCH_ALL() catch (...) { __hr = ReportError(E_UNEXPECTED); }
	#define COM_CATCH_ALL_EX(ClassName) catch (...) { __hr = static_cast<ClassName*>(this)->ReportError(E_UNEXPECTED); }
#else
	#define COM_CATCH_ALL()
	#define COM_CATCH_ALL_EX(ClassName)
#endif

// Template for method end
#define COM_METHOD_END() PROFILE_SET_ERROR(__hr); if (SUCCEEDED(__hr)) ::SetErrorInfo(0, NULL); return __hr;
#define COM_METHOD_END_VOID() PROFILE_SET_ERROR(__hr); if (SUCCEEDED(__hr)) ::SetErrorInfo(0, NULL);

// Standard COM-method templates
#define BEGIN_STDMETHOD() COM_METHOD_START() try { COM_LOCK_OBJECT()
#define END_STDMETHOD() } COM_CATCH_ERROR() COM_CATCH_ATLERROR() COM_CATCH_ALL() COM_METHOD_END()
#define END_STDMETHOD_VOID() } COM_CATCH_ERROR() COM_CATCH_ATLERROR() COM_CATCH_ALL() COM_METHOD_END_VOID()

#define BEGIN_STDMETHOD_EX(ClassName) COM_METHOD_START() try { COM_LOCK_OBJECT_EX(ClassName)
#define END_STDMETHOD_EX(ClassName) } COM_CATCH_ERROR_EX(ClassName) COM_CATCH_ATLERROR_EX(ClassName) COM_CATCH_ALL_EX(ClassName) COM_METHOD_END()

#define BEGIN_STDMETHOD_NOLOCK() COM_METHOD_START() try {
#define END_STDMETHOD_NOLOCK() } COM_CATCH_ERROR() COM_CATCH_ATLERROR() COM_CATCH_ALL() COM_METHOD_END()

#define BEGIN_STDMETHOD_NOLOCK_EX(ClassName) COM_METHOD_START() try {
#define END_STDMETHOD_NOLOCK_EX(ClassName) } COM_CATCH_ERROR_EX(ClassName) COM_CATCH_ATLERROR_EX(ClassName) COM_CATCH_ALL_EX(ClassName) COM_METHOD_END()

#define BEGIN_STDMETHOD_NOTHROW() COM_METHOD_START() COM_LOCK_OBJECT()
#define END_STDMETHOD_NOTHROW() COM_METHOD_END()

#define BEGIN_STDMETHOD_NOTHROW_EX(ClassName) COM_METHOD_START() COM_LOCK_OBJECT_EX(ClassName)
#define END_STDMETHOD_NOTHROW_EX(ClassName) COM_METHOD_END()

#define BEGIN_STDMETHOD_NOTHROW_NOLOCK() COM_METHOD_START()
#define END_STDMETHOD_NOTHROW_NOLOCK() COM_METHOD_END()

#define BEGIN_STDMETHOD_NOTHROW_NOLOCK_EX(ClassName) COM_METHOD_START()
#define END_STDMETHOD_NOTHROW_NOLOCK_EX(ClassName) COM_METHOD_END()

// Manual error setting
#define STDMETHOD_SET_ERROR(hr) __hr = hr;

/////////////////////////////////////////////////////////////////////////////
//           Standard COM error handling for the internal objects          //
/////////////////////////////////////////////////////////////////////////////

#ifdef DV_PROFILE_CALLS
	// Profiling templates
	#define PROFILE_BEGIN_METHOD() Helpers::CProfileHelper __profiler(_T(__FUNCTION__), _T(__FILE__), __LINE__);
	#define PROFILE_WRITE_MESSAGE(message, data) __profiler.ProfileMessage(message, data)
	#define PROFILE_WRITE_ERROR(message, hr) __profiler.ProfileError(message, hr)
	#define PROFILE_SET_ERROR(hr) __profiler.SetError(hr)

	// Standard internal method template
	#define BEGIN_METHOD_NOTHROW() PROFILE_BEGIN_METHOD();
	#define END_METHOD_NOTHROW()
	#define BEGIN_METHOD() BEGIN_METHOD_NOTHROW(); try {
	#define END_METHOD() } catch (const _com_error& e) { PROFILE_SET_ERROR(e.Error()); throw; } catch (...) { PROFILE_SET_ERROR(E_UNEXPECTED); throw; }
#else
	// Profiling turned off
	#define PROFILE_BEGIN_METHOD()
	#define PROFILE_WRITE_MESSAGE(message, data)
	#define PROFILE_WRITE_ERROR(errorInfo, hr)
	#define PROFILE_SET_ERROR(hr)

	#define BEGIN_METHOD_NOTHROW()
	#define END_METHOD_NOTHROW()
	#define BEGIN_METHOD()
	#define END_METHOD()
#endif	// DV_PROFILE_CALLS

#define PROFILE_WRITE_STRING(message) PROFILE_WRITE_MESSAGE(message, NULL)
#define PROFILE_WRITE_STRING1(format, arg1) PROFILE_WRITE_MESSAGE(FormatMessageString(format, arg1), NULL)
#define PROFILE_WRITE_STRING2(format, arg1, arg2) PROFILE_WRITE_MESSAGE(FormatMessageString(format, arg1, arg2), NULL)
#define PROFILE_WRITE_STRING3(format, arg1, arg2, arg3) PROFILE_WRITE_MESSAGE(FormatMessageString(format, arg1, arg2, arg3), NULL)
#define PROFILE_WRITE_STRING4(format, arg1, arg2, arg3, arg4) PROFILE_WRITE_MESSAGE(FormatMessageString(format, arg1, arg2, arg3, arg4), NULL)
#define PROFILE_WRITE_STRING5(format, arg1, arg2, arg3, arg4, arg5) PROFILE_WRITE_MESSAGE(FormatMessageString(format, arg1, arg2, arg3, arg4, arg5), NULL)

namespace Helpers
{
	using namespace ATL;

/////////////////////////////////////////////////////////////////////////////
//                       Argument chacking helpers                         //
/////////////////////////////////////////////////////////////////////////////

// IsBadReadPtr

template <typename T>
ATL_FORCEINLINE BOOL IsBadReadPtr(const T *pv) noexcept
{
	return ::IsBadReadPtr(pv, sizeof(T));
}

template <typename T>
ATL_FORCEINLINE BOOL IsBadReadPtr(const T *pv, UINT_PTR ucb) noexcept
{
	return ::IsBadReadPtr(pv, ucb);
}

template <>
ATL_FORCEINLINE BOOL IsBadReadPtr(const void *pv) noexcept
{
	return (pv == NULL);
}

// IsBadWritePtr

template <typename T>
ATL_FORCEINLINE BOOL IsBadWritePtr(T *pv) noexcept
{
	return ::IsBadWritePtr(pv, sizeof(T));
}

template <typename T>
ATL_FORCEINLINE BOOL IsBadWritePtr(T *pv, UINT_PTR ucb) noexcept
{
	return ::IsBadWritePtr(pv, ucb);
}

template <>
ATL_FORCEINLINE BOOL IsBadWritePtr(void *pv) noexcept
{
	return (pv == NULL);
}

// ClearValue

template <typename T>
ATL_FORCEINLINE void ClearValue(T *pv) noexcept
{
	::ZeroMemory(pv, sizeof(T));
}

template <typename T>
ATL_FORCEINLINE void ClearValue(T *pv, UINT_PTR ucb) noexcept
{
	::ZeroMemory(pv, ucb);
}

template <>
ATL_FORCEINLINE void ClearValue(void **pv) noexcept
{
	*pv = NULL;
}

template <>
ATL_FORCEINLINE void ClearValue(bool *pv) noexcept
{
	*pv = false;
}

template <>
ATL_FORCEINLINE void ClearValue(char *pv) noexcept
{
	*pv = 0;
}

template <>
ATL_FORCEINLINE void ClearValue(unsigned char *pv) noexcept
{
	*pv = 0;
}

template <>
ATL_FORCEINLINE void ClearValue(short *pv) noexcept
{
	*pv = 0;
}

template <>
ATL_FORCEINLINE void ClearValue(unsigned short *pv) noexcept
{
	*pv = 0;
}

template <>
ATL_FORCEINLINE void ClearValue(int *pv) noexcept
{
	*pv = 0;
}

template <>
ATL_FORCEINLINE void ClearValue(unsigned int *pv) noexcept
{
	*pv = 0;
}

template <>
ATL_FORCEINLINE void ClearValue(long *pv) noexcept
{
	*pv = 0;
}

template <>
ATL_FORCEINLINE void ClearValue(unsigned long *pv) noexcept
{
	*pv = 0;
}

template <>
ATL_FORCEINLINE void ClearValue(__int64 *pv) noexcept
{
	*pv = 0;
}

template <>
ATL_FORCEINLINE void ClearValue(unsigned __int64 *pv) noexcept
{
	*pv = 0;
}

template <>
ATL_FORCEINLINE void ClearValue(float *pv) noexcept
{
	*pv = 0;
}

template <>
ATL_FORCEINLINE void ClearValue(double *pv) noexcept
{
	*pv = 0;
}

template <>
ATL_FORCEINLINE void ClearValue(VARIANT *pv) noexcept
{
	ATLVERIFY(SUCCEEDED(::VariantClear(pv)));
	V_VT(pv) = VT_NULL;
}

/////////////////////////////////////////////////////////////////////////////
//                       ATL error handling support                        //
/////////////////////////////////////////////////////////////////////////////

template <class T, const IID* piid = &GUID_NULL>
class CAtlReportError
{
public:
	HRESULT ReportError(const _com_error& e) const noexcept
	{
		const _bstr_t sDesc(e.Description());
		return T::Error(sDesc.length() ? static_cast<LPCOLESTR>(sDesc) : FormatErrorMessage(e.Error()), *piid, e.Error());
	}

	HRESULT ReportError(HRESULT hr) const noexcept
	{
		return T::Error(static_cast<LPCOLESTR>(FormatErrorMessage(hr)), *piid, hr);
	}
};

/////////////////////////////////////////////////////////////////////////////
//                   COM API error handling routines                       //
/////////////////////////////////////////////////////////////////////////////

ATL_NORETURN inline void RaiseComError(HRESULT hr, IErrorInfo* pErrorInfo = NULL)
{
	// raise COM error
	::_com_raise_error(hr, pErrorInfo);
}

ATL_NORETURN inline void RaiseComErrorEx(HRESULT hr, LPCOLESTR pwsMessage)
{
	CComPtr<IErrorInfo> spErrorInfo;

	try
	{	// create error description
		CComPtr<ICreateErrorInfo> spICEI;
		_com_util::CheckError(::CreateErrorInfo(&spICEI));
		_com_util::CheckError(spICEI->SetDescription((LPOLESTR)pwsMessage));
		_com_util::CheckError(spICEI->QueryInterface(__uuidof(IErrorInfo), (void**)&spErrorInfo));
	}
	catch (...) { /* nothing to do */ }

	// raise COM error with description
	RaiseComError(hr, spErrorInfo.Detach());
}

inline void CheckComError(HRESULT hr)
{
	if (FAILED(hr))
	{	// raise COM error
		RaiseComError(hr);
	}
}

/////////////////////////////////////////////////////////////////////////////
//                  Win32 API error handling routines                      //
/////////////////////////////////////////////////////////////////////////////

ATL_NORETURN inline void RaiseWin32Error(DWORD dwError)
{
	// raise COM error from Win32 API error code
	RaiseComError(HRESULT_FROM_WIN32(dwError));
}

inline void CheckWin32Error(DWORD dwError)
{
	if (dwError != ERROR_SUCCESS)
	{	// raise Win32 error
		RaiseWin32Error(dwError);
	}
}

inline void CheckWin32Error(BOOL IsOk = FALSE)
{
	if (IsOk == FALSE)
	{	// check last Win32 error code
		CheckWin32Error(::GetLastError());
	}
}

/////////////////////////////////////////////////////////////////////////////
//           LocaleID global variable for multilanguage support            //
/////////////////////////////////////////////////////////////////////////////

__declspec(selectany) LCID g_dwLocaleID = ::GetUserDefaultLCID();
__declspec(selectany) BOOL g_bThreadedLocalization = FALSE;
inline LCID GetLocaleID() noexcept
{ 
	return g_bThreadedLocalization != FALSE ? ::GetThreadLocale() : g_dwLocaleID;
}

inline void SetLocaleID(LCID dwLocaleID) noexcept 
{ 
	if (g_bThreadedLocalization != FALSE)
		::SetThreadLocale(dwLocaleID);
	else
		g_dwLocaleID = dwLocaleID;  
}
inline BOOL GetThreadedLocalization() noexcept { return g_bThreadedLocalization;  }
inline void SetThreadedLocalization(BOOL bThreadedLocalization) noexcept { g_bThreadedLocalization = bThreadedLocalization; }



/////////////////////////////////////////////////////////////////////////////
//                   Error message formating routines                      //
/////////////////////////////////////////////////////////////////////////////

ATL_NOINLINE inline LPTSTR LoadMessageString(DWORD dwMessageId, va_list* arglist = NULL) noexcept
{
	LPTSTR pszMessage = NULL;
	HINSTANCE hInst = _AtlBaseModule.GetModuleInstance();

	DWORD dwFlags = (FORMAT_MESSAGE_ALLOCATE_BUFFER | FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_FROM_HMODULE);
	if (arglist == NULL)
	{	// disable inserts if there is no arguments
		dwFlags |= FORMAT_MESSAGE_IGNORE_INSERTS;
	}

	// try to find localized resource
	::FormatMessage(
		dwFlags,
		hInst,
		dwMessageId,
		LANGIDFROMLCID(GetLocaleID()),
		(LPTSTR)&pszMessage,
		0,
		arglist);

	if (pszMessage == NULL)
	{	// try to find neutral resource
		::FormatMessage(
			dwFlags,
			hInst,
			dwMessageId,
			MAKELANGID(LANG_NEUTRAL, SUBLANG_NEUTRAL),
			(LPTSTR)&pszMessage,
			0,
			arglist);
	}

	return pszMessage;
}

ATL_NOINLINE inline LPTSTR LoadMessageStringEx(DWORD dwMessageId, ...) noexcept
{
	// initialize variable arguments
	va_list arglist;
	va_start(arglist, dwMessageId);

	// load message string
	LPTSTR pszMessage = LoadMessageString(dwMessageId, &arglist);

	// reset variable arguments
	va_end(arglist);

	return pszMessage;
}

ATL_NOINLINE inline _bstr_t FormatErrorMessage(HRESULT hr, va_list* arglist = NULL) noexcept
{
	// try to format message for HRESULT
	LPTSTR pszMessage = LoadMessageString(hr, arglist);

	if ((pszMessage == NULL) && (HRESULT_FACILITY(hr) == FACILITY_WIN32))
	{	// try to format message for Win32 error code
		pszMessage = LoadMessageString(HRESULT_CODE(hr), arglist);
	}

	if (pszMessage != NULL)
	{	// correct string
		size_t nLen = ::_tcslen(pszMessage);
		if (nLen > 1 && pszMessage[nLen - 1] == _T('\n'))
		{
			pszMessage[nLen - 1] = 0;
			if (pszMessage[nLen - 2] == _T('\r'))
			{
				pszMessage[nLen - 2] = _T('\0');
			}
		}
	}
	else
	{	// use "Unknown error" text as error message
		pszMessage = (LPTSTR)::LocalAlloc(0, 32 * sizeof(TCHAR));
		if (pszMessage != NULL)
		{
			::_stprintf(pszMessage, _T("Unknown error 0x%08lX"), hr);
		}
	}

	// create _bstr_t
	_bstr_t strMessage;
	ATLTRY(strMessage = pszMessage);
	::LocalFree(pszMessage);

	return strMessage;
}

ATL_NOINLINE inline _bstr_t FormatErrorMessageEx(HRESULT hr, ...) noexcept
{
	// initialize variable arguments
	va_list arglist;
	va_start(arglist, hr);

	// format error message
	_bstr_t strMessage = FormatErrorMessage(hr, &arglist);

	// reset variable arguments
	va_end(arglist);

	return strMessage;
}

ATL_NOINLINE inline _bstr_t FormatMessageString(LPCTSTR pszFormat, ...) noexcept
{
	// initialize variable arguments
	va_list arglist;
	va_start(arglist, pszFormat);

	// allocate memory
	int nCount = ::_vsctprintf(pszFormat, arglist);
	LPTSTR pszMessage = (LPTSTR)::LocalAlloc(0, (nCount + 1) * sizeof(TCHAR));

	if (pszMessage != NULL)
	{	// write formatted string
		::_vsntprintf(pszMessage, nCount, pszFormat, arglist);

		// ensure that string is NULL terminated
		pszMessage[nCount] = _T('\0');
	}

	// reset variable arguments
	va_end(arglist);

	// create _bstr_t
	_bstr_t strMessage;
	ATLTRY(strMessage = pszMessage);
	::LocalFree(pszMessage);

	return strMessage;
}

/////////////////////////////////////////////////////////////////////////////
//                          Profiler global object                         //
/////////////////////////////////////////////////////////////////////////////

__interface IProfiler
{
	void ProfileMessage(LPCTSTR pszMethodInfo, LPCTSTR pszSourceFile, UINT nLineNumber, LPCTSTR pszMessage, LPCTSTR pszData);
	void ProfileError(LPCTSTR pszMethodInfo, LPCTSTR pszSourceFile, UINT nLineNumber, LPCTSTR pszMessage, HRESULT hr);
	void ProfileMethodStart(LPCTSTR pszMethodInfo, LPCTSTR pszSourceFile, UINT nLineNumber);
	void ProfileMethodStop(LPCTSTR pszMethodInfo, LPCTSTR pszSourceFile, UINT nLineNumber, HRESULT hr);
};

__declspec(selectany) IProfiler* g_pProfiler = NULL;
inline IProfiler* GetProfiler() noexcept { ATLASSERT(g_pProfiler); return g_pProfiler; }
inline void SetProfiler(IProfiler* profiler) noexcept { g_pProfiler = profiler; }

/////////////////////////////////////////////////////////////////////////////
//                     Helper class for profiling support                  //
/////////////////////////////////////////////////////////////////////////////

class CProfileHelper
{
public:
	CProfileHelper(LPCTSTR pszMethodInfo, LPCTSTR pszSourceFile, UINT nLineNumber) noexcept
		: m_pszMethodInfo(pszMethodInfo)
		, m_pszSourceFile(pszSourceFile)
		, m_nLineNumber(nLineNumber)
		, m_hr(S_OK)
	{
		GetProfiler()->ProfileMethodStart(m_pszMethodInfo, m_pszSourceFile, m_nLineNumber);
	}

	~CProfileHelper() noexcept
	{
		GetProfiler()->ProfileMethodStop(m_pszMethodInfo, m_pszSourceFile, m_nLineNumber, m_hr);
	}

	void ProfileMessage(LPCTSTR pszMessage, LPCTSTR pszData) const noexcept
	{
		GetProfiler()->ProfileMessage(m_pszMethodInfo, m_pszSourceFile, m_nLineNumber, pszMessage, pszData);
	}

	void ProfileError(LPCTSTR pszMessage, HRESULT hr) const noexcept
	{
		GetProfiler()->ProfileError(m_pszMethodInfo, m_pszSourceFile, m_nLineNumber, pszMessage, hr);
	}

	void SetError(HRESULT error) noexcept
	{
		m_hr = error;
	}

	HRESULT GetError() const noexcept
	{
		return m_hr;
	}

private:
	LPCTSTR m_pszMethodInfo;
	LPCTSTR m_pszSourceFile;
	UINT m_nLineNumber;
	HRESULT m_hr;
};

/////////////////////////////////////////////////////////////////////////////
//                           Base profiler class                           //
/////////////////////////////////////////////////////////////////////////////

class CProfilerBase : public IProfiler
{
public:
	virtual void WriteDebugMessage(LPCTSTR pszMessage, LPCTSTR pszData) noexcept
	{
		::OutputDebugString(pszMessage);
		if (pszData != NULL)
		{
			::OutputDebugString(pszData);
		}
	}

	void ProfileMessage(LPCTSTR pszMethodInfo, LPCTSTR pszSourceFile, UINT nLineNumber, LPCTSTR pszMessage, LPCTSTR pszData) noexcept
	{
		TCHAR pszProfileMsg[1024];
		::_sntprintf(pszProfileMsg, ARRAYSIZE(pszProfileMsg) - 1, _T("%s(%u): Method '%s' reporting message: %s\r\n"),
			pszSourceFile, nLineNumber, pszMethodInfo, pszMessage);
		pszProfileMsg[ARRAYSIZE(pszProfileMsg) - 1] = 0;
		WriteDebugMessage(pszProfileMsg, pszData);
	}

	void ProfileError(LPCTSTR pszMethodInfo, LPCTSTR pszSourceFile, UINT nLineNumber, LPCTSTR pszMessage, HRESULT hr) noexcept
	{
		TCHAR pszProfileMsg[1024];
		::_sntprintf(pszProfileMsg, ARRAYSIZE(pszProfileMsg) - 1, _T("%s(%u): Method '%s' reporting error: (0x%08lX) %s. Description: %s\r\n"),
			pszSourceFile, nLineNumber, pszMethodInfo, hr, (LPCTSTR)FormatErrorMessage(hr), pszMessage);
		pszProfileMsg[ARRAYSIZE(pszProfileMsg) - 1] = 0;
		WriteDebugMessage(pszProfileMsg, NULL);
	}

	void ProfileMethodStart(LPCTSTR pszMethodInfo, LPCTSTR pszSourceFile, UINT nLineNumber) noexcept
	{
#ifdef DV_PROFILE_CALLS_ALL
		TCHAR pszProfileMsg[1024];
		::_sntprintf(pszProfileMsg, ARRAYSIZE(pszProfileMsg) - 1, _T("%s(%u): Method '%s' started.\r\n"),
			pszSourceFile, nLineNumber, pszMethodInfo);
		pszProfileMsg[ARRAYSIZE(pszProfileMsg) - 1] = 0;
		WriteDebugMessage(pszProfileMsg, NULL);
#else
		UNREFERENCED_PARAMETER(pszMethodInfo);
		UNREFERENCED_PARAMETER(pszSourceFile);
		UNREFERENCED_PARAMETER(nLineNumber);
#endif	// DV_PROFILE_CALLS_ALL
	}

	void ProfileMethodStop(LPCTSTR pszMethodInfo, LPCTSTR pszSourceFile, UINT nLineNumber, HRESULT hr) noexcept
	{
		if (FAILED(hr))
		{
			TCHAR pszProfileMsg[1024];
			::_sntprintf(pszProfileMsg, ARRAYSIZE(pszProfileMsg) - 1, _T("%s(%u): Method '%s' failed with error: (0x%08lX) %s\r\n"),
				pszSourceFile, nLineNumber, pszMethodInfo, hr, (LPCTSTR)FormatErrorMessage(hr));
			pszProfileMsg[ARRAYSIZE(pszProfileMsg) - 1] = 0;
			WriteDebugMessage(pszProfileMsg, NULL);
		}
#ifdef DV_PROFILE_CALLS_ALL
		else
		{
			TCHAR pszProfileMsg[1024];
			::_sntprintf(pszProfileMsg, ARRAYSIZE(pszProfileMsg) - 1, _T("%s(%u): Method '%s' succeeded.\r\n"),
				pszSourceFile, nLineNumber, pszMethodInfo;
			pszProfileMsg[ARRAYSIZE(pszProfileMsg) - 1] = 0;
			WriteDebugMessage(pszProfileMsg, NULL);
		}
#endif	// DV_PROFILE_CALLS_ALL
	}
};

};	// namespace Helpers
