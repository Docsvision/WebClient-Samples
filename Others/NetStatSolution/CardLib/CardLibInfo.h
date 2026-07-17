// CardLibInfo.h : Declaration of the CCardLibInfo
#pragma once
#include "resource.h"	// main symbols

///////////////////////////////////////////////////////////////////////////////
// CCardLibInfo

#define LIBRARY_VERSION_UNKOWN -1
#define LIBRARY_VERSION_ERROR_OCCURED -2
__declspec(selectany) long g_nLibraryVersion = LIBRARY_VERSION_UNKOWN;

class ATL_NO_VTABLE CCardLibInfo :
	public CComObjectRootEx<CComMultiThreadModel>,
	public CComCoClass<CCardLibInfo, &__uuidof(CardLib)>,
	public CAtlReportError<CCardLibInfo, &__uuidof(CardLib)>,
	public IDispatchImpl<DVObjectManager::ICardLibraryInfo2, &__uuidof(DVObjectManager::ICardLibraryInfo2), &__uuidof(__NetstatSolution), VERSION_MAJOR, VERSION_MINOR>,
	public ISupportErrorInfo
{
public:
	DECLARE_REGISTRY_RESOURCEID(IDR_CARDLIB)
	DECLARE_PROTECT_FINAL_CONSTRUCT()
	DECLARE_GET_CONTROLLING_UNKNOWN()

	HRESULT FinalConstruct() throw()
	{
		return ::CoCreateFreeThreadedMarshaler(GetControllingUnknown(), &m_spMarshaler.p);
	}

// Supported COM interfaces
BEGIN_COM_MAP(CCardLibInfo)
	COM_INTERFACE_ENTRY(ISupportErrorInfo)
	COM_INTERFACE_ENTRY2(IDispatch, DVObjectManager::ICardLibraryInfo)	// implemented by IDispatchImpl
	COM_INTERFACE_ENTRY(DVObjectManager::ICardLibraryInfo)
	COM_INTERFACE_ENTRY(DVObjectManager::ICardLibraryInfo2)
	COM_INTERFACE_ENTRY_AGGREGATE(IID_IMarshal, m_spMarshaler.p)
END_COM_MAP()

// ISupportErrorInfo
BEGIN_ERRORINFO_MAP()
	INTERFACE_SUPPORT_ERROR_INFO(ICardLibraryInfo)
	INTERFACE_SUPPORT_ERROR_INFO(ICardLibraryInfo2)
END_ERRORINFO_MAP()

// ICardLibraryInfo
public:
	STDMETHOD(get_Icon)(/*[out, retval]*/ VARIANT* pvIcon);
	STDMETHOD(get_CardTypeIcon)(/*[in]*/ BSTR bsCardTypeID, /*[out, retval]*/ VARIANT* pvIcon);
	STDMETHOD(get_CardTypeDefinition)(/*[in]*/ BSTR bsCardTypeID, /*[out, retval]*/ BSTR* pDefinition);
	STDMETHOD(get_Version)(/*[out, retval]*/ long* pVer);

	// ICardLibraryInfo2
	STDMETHOD(get_BuildVersion)(long* pVer);

private:
	CComPtr<IUnknown> m_spMarshaler;
};

OBJECT_ENTRY_AUTO(__uuidof(CardLib), CCardLibInfo)
