// CardLibInfo.cpp : Implementation of CCardLibInfo
#include "StdAfx.h"
#include "CardLibInfo.h"

///////////////////////////////////////////////////////////////////////////////
// Card identifiers

struct CARDTYPE_INFO
{
	GUID CardTypeID;
	int Icon;
	int Xml;
};

static const CARDTYPE_INFO* GetCardType(REFGUID cardTypeId)
{
	static const CARDTYPE_INFO Cards[] =
	{
		// Добавить идентификаторы карточек, иконки и схемы
		{ { 0xCCCA40C0, 0x5FA4, 0x4878, { 0xB0, 0xDA, 0x34, 0xE6, 0x7E, 0x16, 0x7B, 0xEA } }, IDI_CARD, IDR_CARD },
	};

	for (int i = 0; i < ARRAYSIZE(Cards); ++i)
	{
		if (InlineIsEqualGUID(cardTypeId, Cards[i].CardTypeID))
			return &Cards[i];
	}

	return NULL;
}

///////////////////////////////////////////////////////////////////////////////
// ICardLibraryInfo

STDMETHODIMP CCardLibInfo::get_Icon(VARIANT* pvIcon)
{
	BEGIN_STDMETHOD()
	CHECK_OUT_PTR(pvIcon);

	const HelperAPI::IResourceLoaderPtr spResLoader(__uuidof(HelperAPI::ResourceLoader));
	*pvIcon = spResLoader->LoadResIcon((OLE_HANDLE)PtrToLong(_pModule->GetModuleInstance()), IDI_CARDLIB).Detach();

	END_STDMETHOD()
}

STDMETHODIMP CCardLibInfo::get_CardTypeIcon(BSTR bsCardTypeID, VARIANT* pvIcon)
{
	BEGIN_STDMETHOD()
	CHECK_OUT_PTR(pvIcon);

	const CARDTYPE_INFO* pCardType = GetCardType(_guid_t(bsCardTypeID));
	if (pCardType == NULL)
		::RaiseComError(E_INVALIDARG);

	const HelperAPI::IResourceLoaderPtr spResLoader(__uuidof(HelperAPI::ResourceLoader));
	*pvIcon = spResLoader->LoadResIcon((OLE_HANDLE)PtrToLong(_pModule->GetModuleInstance()), pCardType->Icon).Detach();

	END_STDMETHOD()
}

STDMETHODIMP CCardLibInfo::get_CardTypeDefinition(BSTR bsCardTypeID, BSTR* pDefinition)
{
	BEGIN_STDMETHOD()
	CHECK_OUT_PTR(pDefinition);

	const CARDTYPE_INFO* pCardType = GetCardType(_guid_t(bsCardTypeID));
	if (pCardType == NULL)
		::RaiseComError(E_INVALIDARG);

	const HelperAPI::IResourceLoaderPtr spResLoader(__uuidof(HelperAPI::ResourceLoader));
	*pDefinition = spResLoader->LoadResUTF8String((OLE_HANDLE)PtrToLong(_pModule->GetModuleInstance()), pCardType->Xml, L"XMLDEF").Detach();

	END_STDMETHOD()
}

STDMETHODIMP CCardLibInfo::get_BuildVersion(long* pVer)
{
	BEGIN_STDMETHOD()
		CHECK_OUT_PTR(pVer);

	SmartArrPtr<TCHAR> saFileName(new TCHAR[MAX_PATH]);
	::CheckWin32Error(::GetModuleFileName(_pModule->GetModuleInstance(), saFileName, MAX_PATH) != 0);

	DWORD dwHandle = 0;
	DWORD dwInfoSize = ::GetFileVersionInfoSize(saFileName, &dwHandle);
	::CheckWin32Error(dwInfoSize != 0);

	SmartArrPtr<BYTE> saBlock(new BYTE[dwInfoSize]);
	::CheckWin32Error(::GetFileVersionInfo(saFileName, dwHandle, dwInfoSize, LPBYTE(saBlock)));

	VS_FIXEDFILEINFO* pVerInfo = NULL;
	UINT nLen = 0;
	::CheckWin32Error(::VerQueryValue(LPBYTE(saBlock), _T("\\"), reinterpret_cast<LPVOID *>(&pVerInfo), &nLen));

	*pVer = HIWORD(pVerInfo->dwFileVersionLS);

	END_STDMETHOD()
}

STDMETHODIMP CCardLibInfo::get_Version(long* pVer)
{
	BEGIN_STDMETHOD()
	CHECK_OUT_PTR(pVer);

	if (g_nLibraryVersion == LIBRARY_VERSION_UNKOWN)
	{
		try
		{
			g_nLibraryVersion = 0;

			const HelperAPI::IResourceLoaderPtr spResLoader(__uuidof(HelperAPI::ResourceLoader));
			_bstr_t sCardLibDef(spResLoader->LoadResUTF8String((OLE_HANDLE)PtrToLong(_pModule->GetModuleInstance()), IDR_NETSTATCARDLIB, L"XMLDEF").Detach());

			const MsXml::IXMLDOMDocument2Ptr spParser(__uuidof(MsXml::DOMDocument60));
			if (spParser->loadXML(sCardLibDef) == VARIANT_TRUE && (bool)spParser->documentElement)
			{
				const MsXml::IXMLDOMAttributePtr spVersionAttribute(spParser->documentElement->getAttributeNode("Version"));

				if ((bool)spVersionAttribute)
				{
					spVersionAttribute->PutdataType(L"int");
					g_nLibraryVersion = spVersionAttribute->nodeTypedValue;
				}
			}
		}
		catch (const _com_error&)
		{
			g_nLibraryVersion = LIBRARY_VERSION_ERROR_OCCURED;
		}
	}

	*pVer = g_nLibraryVersion;

	END_STDMETHOD()
}
