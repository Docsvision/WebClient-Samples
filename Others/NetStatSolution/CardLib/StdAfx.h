// stdafx.h : include file for standard system include files,
// or project specific include files that are used frequently,
// but are changed infrequently
#pragma once

#define _BIND_TO_CURRENT_VCLIBS_VERSION 1
#define _BIND_TO_CURRENT_CRT_VERSION 1
#define _BIND_TO_CURRENT_ATL_VERSION 1
#define _BIND_TO_CURRENT_MFC_VERSION 1
#define _BIND_TO_CURRENT_OPENMP_VERSION 1

#define _CRT_ASSEMBLY_VERSION CURRENT_RUNTIME_VERSION
#define _ATL_ASSEMBLY_VERSION CURRENT_RUNTIME_VERSION
#define _MFC_ASSEMBLY_VERSION CURRENT_RUNTIME_VERSION

#pragma warning(disable:4192) // automatically excluding '' while importing type library ''
#pragma warning(disable:4278) // identifier in type library '' is already a macro; use the 'rename' qualifier
#pragma warning(disable:4290) // C++ exception specification ignored except to indicate a function is not __declspec(nothrow)

// The Windows.h header file contains definitions, macros, and structures to help you write
// source code that is portable between versions of Windows. Some of these features are enabled
// when you define the STRICT symbol when building your application
#ifndef STRICT
#define STRICT
#endif

#include <sdkddkver.h>


#define _CRT_SECURE_NO_DEPRECATE
#define _CRT_NON_CONFORMING_SWPRINTFS

// ATL includes
#define _ATL_NO_AUTOMATIC_NAMESPACE

#include <atlbase.h>
#include <atlcom.h>

// COM compiler support
#include <comdef.h>

// Common includes
#include "DVVer.h"		// DocsVision version info
#include "Resource.h"	// Main symbols

// Imports
#import "msxml6.tlb" rename_namespace("MsXml")
#import <libid:40B5FD27-4417-4E91-9D83-EA1E017013AC> version(VER_PRODUCTVERSION_STR)
#import <libid:2FB1EC06-3D90-4B33-854D-0AFBF44D0096> version(VER_PRODUCTVERSION_STR)
#import <libid:42A1E9A2-1FE3-4C46-ABB8-8388CADB1C3E> version(VER_PRODUCTVERSION_STR)
#import "CardLib.tlb" no_namespace	// Self import


// Error handling
#include <eh.h>         // for SEH support
#include "ErrorHandling.h"

// Helpers
#include "SmartATL.h"
#include "SmartGUID.h"

using namespace ATL;
using namespace Helpers; 
