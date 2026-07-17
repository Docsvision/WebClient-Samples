/***
* SmartGuid.h - Extension for native C++ compiler COM support - GUID wrapper header
*
* Copyright (c) 2002-2003 Digital Design. All rights reserved.
*
****/

#if !defined(_INC_SMARTGUID)
#define _INC_SMARTGUID

#if defined(_MSC_VER) && (_MSC_VER >= 1020)
#pragma once
#endif

#include <objbase.h>		// for GUID API
#include <comdef.h>		// for _com_error

#pragma warning(push)
#pragma warning(disable: 4239) // nonstandard extension used : 'token' : conversion from 'type' to 'type'

namespace Helpers
{

template <typename T>
void mem_swap(T * left, T * right) noexcept
{
	char temp[sizeof T];
	::memcpy(temp, left, sizeof T);
	::memcpy(left, right, sizeof T);
	::memcpy(right, temp, sizeof T);
}

//////////////////////////////////////////////////////////////////////////////
//
// Wrapper class for GUID (declaration)
//
//////////////////////////////////////////////////////////////////////////////
template <class CachePolicy = DisallowCache>
class _guid_t_base;

////////////////////////////////////////////////////////////////////////////////
// class AllowCache
// Implementation of the CachePolicy used by _guid_t_base
////////////////////////////////////////////////////////////////////////////////
class AllowCache
{
public:
	template <class SomeCachePolicy>
	_bstr_t Extract(const _guid_t_base<SomeCachePolicy> & g) const
	{
		if (!m_str.length())
		{
			OLECHAR sGuid[_guid_t_base<SomeCachePolicy>::cMaxGuidChars];
			::StringFromGUID2(g, sGuid, _guid_t_base<SomeCachePolicy>::cMaxGuidChars);
			m_str = sGuid;
		}

		return m_str;
	}

	template <class SomeCachePolicy>
	BSTR ExtractRaw(const _guid_t_base<SomeCachePolicy> & g) const
	{
		return Extract(g).copy();	// copy string as we hold it
	}

private:
	mutable _bstr_t m_str; // cached string representation of a GUID
};

////////////////////////////////////////////////////////////////////////////////
// class DisallowCache
// Implementation of the CachePolicy used by _guid_t_base
////////////////////////////////////////////////////////////////////////////////
struct DisallowCache
{
public:
	template <class SomeCachePolicy>
	_bstr_t Extract(const _guid_t_base<SomeCachePolicy> & g) const
	{
		OLECHAR sGuid[_guid_t_base<SomeCachePolicy>::cMaxGuidChars];
		::StringFromGUID2(g, sGuid, _guid_t_base<SomeCachePolicy>::cMaxGuidChars);
		return sGuid;
	}

	template <class SomeCachePolicy>
	BSTR ExtractRaw(const _guid_t_base<SomeCachePolicy> & g) const
	{
		return Extract(g).Detach();	// detach string as we do not hold it
	}
};

//////////////////////////////////////////////////////////////////////////////
//
// Wrapper class for GUID (definition)
//
//////////////////////////////////////////////////////////////////////////////
template <class CachePolicy>
class _guid_t_base : public ::GUID, private CachePolicy
{
public:
	//
	// Constructors
	//

	// Default constructor
	// Create a new _guid_t_base	if bCreateNew is true, GUID_NULL otherwise
	explicit _guid_t_base(bool bNewGuid = false) : ::GUID(__uuidof(0))
	{
		if (bNewGuid)
			_com_util::CheckError(::CoCreateGuid(this));
	}

	// Copy constructor
	template <class OtherCachePolicy>
	_guid_t_base(const _guid_t_base<OtherCachePolicy> & other) noexcept : ::GUID(other)
	{
	}

	// Construct a _guid_t_base from a GUID
	_guid_t_base(const ::GUID & g) noexcept : ::GUID(g)
	{
	}

	// Construct a _guid_t_base from a _bstr_t
	_guid_t_base(const _bstr_t & s)
	{
		convert(s);
	}

	// Construct a _guid_t_base from a BSTR
	_guid_t_base(const BSTR s)
	{
		convert(s);
	}

	// Create a new _guid_t_base
	static _guid_t_base<CachePolicy> NewGuid()
	{
		return _guid_t_base<CachePolicy>(true);
	}

	//
	// Destructor
	//
	~_guid_t_base() noexcept
	{
	}

	//
	// Assignment operators
	//

	// Default assign operator
	template <class OtherCachePolicy>
	_guid_t_base<CachePolicy> & operator=(const _guid_t_base<OtherCachePolicy> & other) noexcept
	{
		return swap(_guid_t_base<CachePolicy>(other));
	}

	// Assign a GUID to a _guid_t_base
	_guid_t_base<CachePolicy> & operator=(const ::GUID & g) noexcept
	{
		return swap(_guid_t_base<CachePolicy>(g));
	}

	// Assign a _bstr_t to a _guid_t_base
	_guid_t_base<CachePolicy> & operator=(const _bstr_t & s)
	{
		return swap(_guid_t_base<CachePolicy>(s));
	}

	// Assign a BSTR to a _guid_t_base
	_guid_t_base<CachePolicy> & operator=(const BSTR s)
	{
		return swap(_guid_t_base<CachePolicy>(s));
	}

	//
	// Extractors
	//

	// Extract a _bstr_t
	operator _bstr_t() const
	{
		return CachePolicy::Extract(*this);
	}

	// This operator is provided so that simple boolean expressions will
	// work.  For example: "if (guid) ...".
	// Returns true if the guid is not GUID_NULL (== __uuidof(0)).
	operator bool() const noexcept
	{
		return *this != _guid_t_base<CachePolicy>();
	}

	//
	// Comparison operators
	//
	bool operator!() const noexcept
	{
		return !operator bool();
	}

	bool operator==(const ::GUID & rOther) const noexcept
	{
		return ::IsEqualGUID(*this, rOther) == TRUE;
	}

	bool operator==(const ::GUID * pOther) const noexcept
	{
		return *this == *pOther;
	}

	bool operator!=(const ::GUID & rOther) const noexcept
	{
		return !(*this == rOther);
	}

	bool operator!=(const ::GUID * pOther) const noexcept
	{
		return !(*this == pOther);
	}

	bool operator==(const _bstr_t & sOther) const noexcept
	{
		return static_cast<_bstr_t>(*this) == sOther;
	}

	bool operator!=(const _bstr_t & sOther) const noexcept
	{
		return !(*this == sOther);
	}

	template <class OtherCachePolicy>
	bool operator==(const _guid_t_base<OtherCachePolicy> & other) const noexcept
	{
		return *this == &other;
	}

	template <class OtherCachePolicy>
	bool operator!=(const _guid_t_base<OtherCachePolicy> & other) const noexcept
	{
		return *this != &other;
	}

	template <class OtherCachePolicy>
	bool operator<(const _guid_t_base<OtherCachePolicy> & other) const noexcept
	{
		return ::memcmp(this, &other, sizeof(::GUID)) < 0;
	}

	template <class OtherCachePolicy>
	bool operator>(const _guid_t_base<OtherCachePolicy> & other) const noexcept
	{
		return other < *this;
	}

	template <class OtherCachePolicy>
	bool operator<=(const _guid_t_base<OtherCachePolicy> & other) const noexcept
	{
		return !(other < *this);
	}

	template <class OtherCachePolicy>
	bool operator>=(const _guid_t_base<OtherCachePolicy> & other) const noexcept
	{
		return !(*this < other);
	}

	//
	// Utilities
	//

	// This extractor is provided to solve problem with _bstr_t class. You can not
	// extract string representation of GUID in this simple way:
	// *pBSTR = static_cast<_bstr_t>(my_guid).Detach(); // will assert at this line!
	BSTR GetBSTR() const
	{
		return CachePolicy::ExtractRaw(*this);
	}

private:
	//
	// Low-level utilities
	//

	// Swaps a content of two guids
	_guid_t_base<CachePolicy> & swap(_guid_t_base<CachePolicy> & other) noexcept
	{
		mem_swap(this, &other);
		return *this;
	}

	//Converts from a string, adds brackets if they are missing
	void convert(const LPOLESTR lpsz)
	{
		if (!lpsz || !*lpsz)
			*static_cast<::GUID *>(this) = __uuidof(0);	// set to GUID_NULL if lpsz is NULL or empty
		else
		{
			// add brackets if they are missing
			if (*lpsz != L'{')
			{
				OLECHAR sGuid[cMaxGuidChars];
				sGuid[0] = L'{';
				::wcsncpy(sGuid + 1, lpsz, cMaxGuidChars - 3);
				sGuid[cMaxGuidChars - 2] = L'}';
				sGuid[cMaxGuidChars - 1] = L'\0';

				// convert string to the GUID
				_com_util::CheckError(::IIDFromString(sGuid, this));
			}
			else  // convert string to the GUID
				_com_util::CheckError(::IIDFromString(const_cast<LPOLESTR>(lpsz), this));
		}
	}

public:
	static const int cMaxGuidChars = 39;
};

typedef _guid_t_base<DisallowCache> _guid_t;
typedef _guid_t_base<AllowCache> _guid_t_c;

};	// namespace Helpers

#pragma warning(pop)

#endif /* _INC_SMARTGUID */
