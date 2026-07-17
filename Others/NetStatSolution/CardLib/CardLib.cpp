// CardLib.cpp : Implementation of DLL Exports.
#include "stdafx.h"

///////////////////////////////////////////////////////////////////////////////
// CCardLibModule

class CCardLibModule : public CAtlDllModuleT<CCardLibModule>
{
public:
	DECLARE_LIBID(__uuidof(__NetstatSolution))
};

CCardLibModule _AtlModule;

///////////////////////////////////////////////////////////////////////////////
// Standard COM-dll exports

// DLL Entry Point
extern "C" BOOL WINAPI DllMain(HINSTANCE /*hInstance*/, DWORD dwReason, LPVOID lpReserved)
{
	return _AtlModule.DllMain(dwReason, lpReserved);
}

// Used to determine whether the DLL can be unloaded by OLE
STDAPI DllCanUnloadNow()
{
	return _AtlModule.DllCanUnloadNow();
}

// Returns a class factory to create an object of the requested type
STDAPI DllGetClassObject(REFCLSID rclsid, REFIID riid, LPVOID* ppv)
{
	return _AtlModule.DllGetClassObject(rclsid, riid, ppv);
}

// Adds entries to the system registry
STDAPI DllRegisterServer()
{
	return _AtlModule.DllRegisterServer();
}

// Removes entries from the system registry
STDAPI DllUnregisterServer()
{
	return _AtlModule.DllUnregisterServer();
}
