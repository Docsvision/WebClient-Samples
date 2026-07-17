// DocsVision 5.0 (Fu 2310
#pragma once

#define VERSION_MAJOR                       5
#define VERSION_MINOR                       0
#define VERSION_BUILD						2018
#define VERSION_REVISION                    0
#define VERSION_DISPLAY_MINOR				2

#define MAKE_PRODUCTVERSION_STR2(p1,p2)     #p1 "." #p2
#define MAKE_PRODUCTVERSION_STR(p1,p2)      MAKE_PRODUCTVERSION_STR2(p1,p2)

#define MAKE_FILEVERSION_STR2(p1,p2,p3,p4)  #p1 "." #p2 "." #p3 "." #p4
#define MAKE_FILEVERSION_STR(p1,p2,p3,p4)   MAKE_FILEVERSION_STR2(p1,p2,p3,p4)

#define VER_PRODUCTVERSION								VERSION_MAJOR,VERSION_MINOR
#define VER_PRODUCTVERSION_STR							MAKE_PRODUCTVERSION_STR(VERSION_MAJOR,VERSION_MINOR)
#define VER_FILEVERSION									VERSION_MAJOR,VERSION_MINOR,VERSION_BUILD,VERSION_REVISION
#define VER_FILEVERSION_STR								MAKE_FILEVERSION_STR(VERSION_MAJOR,VERSION_MINOR,VERSION_BUILD,VERSION_REVISION)
#define VER_FILEVERSION_DISPLAY_STR						MAKE_FILEVERSION_STR(VERSION_MAJOR,VERSION_DISPLAY_MINOR,VERSION_BUILD,VERSION_REVISION)

#define VER_COMPANYNAME_STR                 "DocsVision"
#define VER_PRODUCTNAME_STR                 "Docsvision 5"
#define VER_LEGALTRADEMARKS_STR             "DocsVision ® is a registered trademark of DocsVision Corporation."
#define VER_LEGALCOPYRIGHT_STR              "Copyright © 2001-2013 DocsVision. All rights reserved."

#define PUBLICKEY                           "00240000048000009400000006020000002400005253413100040000010001003B86F970F00C2E86A49C5A2C64C90648B4B9220B7B7759CA0116A09AD888826362A396E14706397979D2ADCAE5E3F94470F65D988896139FECBB9475627FC023E19864EF4BC151ECD8B2E93ABA3CC5CF740044FB8589A8EE538EC714EAFF80EB2F68BAC9534FD37FAF89C39A435FF07BBAB2C9A7A50B079CCCB0E47D9F0054E3"
#define PUBLICKEY_TOKEN                     "7148AFE997F90519"
#define PUBLICKEY_CONTAINER                 "DocsVision2007"

#define TYPELIB_VERSION                     VERSION_MAJOR.VERSION_MINOR
#define TYPELIB_VERSION_STR                 MAKE_PRODUCTVERSION_STR(VERSION_MAJOR,VERSION_MINOR)

//#define CURRENT_RUNTIME_VERSION	            "9.0.30729.162"

// Platform
#define TYPELIB_OBJECTMANAGER               "DocsVision " VER_PRODUCTVERSION_STR " Object Manager"
#define TYPELIB_SECURITYMANAGER             "DocsVision " VER_PRODUCTVERSION_STR " Security Manager"
#define TYPELIB_CARDHOST                    "DocsVision " VER_PRODUCTVERSION_STR " Card Host"
#define TYPELIB_NAVIGATOR                   "DocsVision " VER_PRODUCTVERSION_STR " Navigator"
#define TYPELIB_NAVIGATOREXT                "DocsVision " VER_PRODUCTVERSION_STR " Navigator Extensions"
#define TYPELIB_HELPERAPI                   "DocsVision " VER_PRODUCTVERSION_STR " Helper API"
//#define TYPELIB_INFOPATH_CARD               "DocsVision " VER_PRODUCTVERSION_STR " InfoPath Card"
#define TYPELIB_PROPPAGE_D                  "DocsVision " VER_PRODUCTVERSION_STR " PropPages Designer"
#define TYPELIB_PROPPAGE_R                  "DocsVision " VER_PRODUCTVERSION_STR " PropPages Runtime"
#define TYPELIB_STORAGESERVER_PROXY         "DocsVision " VER_PRODUCTVERSION_STR " StorageServer Proxy"
#define TYPELIB_WINDOWHOOK                  "DocsVision " VER_PRODUCTVERSION_STR " WindowHook"
#define TYPELIB_CRYPTUTIL                   "DocsVision " VER_PRODUCTVERSION_STR " CryptUtil"
#define TYPELIB_CRYPTUTIL_PGP               "DocsVision " VER_PRODUCTVERSION_STR " CryptUtil PGP Library"
#define TYPELIB_CRYPTUTIL_BICRYPT           "DocsVision " VER_PRODUCTVERSION_STR " CryptUtil BiCrypt Library"
#define TYPELIB_FORMCONTROLS                "DocsVision " VER_PRODUCTVERSION_STR " Form Controls"
#define TYPELIB_PERFUTIL                    "DocsVision " VER_PRODUCTVERSION_STR " PerfUtil Library"
#define TYPELIB_NAVIGATORHOST               "DocsVision " VER_PRODUCTVERSION_STR " Navigator Host"

// Offline Client
#define TYPELIB_OUTLOOKADDIN                "DocsVision " VER_PRODUCTVERSION_STR " Add-In for Microsoft Outlook"
#define TYPELIB_OFFICEADDIN                 "DocsVision " VER_PRODUCTVERSION_STR " Add-In for Microsoft Office"
#define TYPELIB_PERSONALSTORE               "DocsVision " VER_PRODUCTVERSION_STR " Personal Store"
#define TYPELIB_PERSONALSTORE_PROXY         "DocsVision " VER_PRODUCTVERSION_STR " Personal Store Proxy"
#define TYPELIB_SYNCAGENT                   "DocsVision " VER_PRODUCTVERSION_STR " Synchronization Agent"

// Libraries
#define TYPELIB_TOCARDLIB                   "TakeOffice " VER_PRODUCTVERSION_STR " Card Library"
#define TYPELIB_TO_OFFICE_HELPER            "TakeOffice " VER_PRODUCTVERSION_STR " Office Helper"
#define TYPELIB_BOCARDLIB                   "BackOffice " VER_PRODUCTVERSION_STR " Card Library"
#define TYPELIB_WORKFLOWCARDLIB             "Workflow " VER_PRODUCTVERSION_STR " Card Library"
#define TYPELIB_WORKFLOW_TYPE_MANAGER       "Workflow " VER_PRODUCTVERSION_STR " Type Manager"
#define TYPELIB_AXAPTAGATECARDLIB           "Axapta Gate " VER_PRODUCTVERSION_STR " Card Library"
#define TYPELIB_DDMCARDLIB                  "DDM " VER_PRODUCTVERSION_STR " Card Library"
#define TYPELIB_ADCARDLIB					"Approval Designer " VER_PRODUCTVERSION_STR " Card Library"
#define TYPELIB_AICARDLIB					"Actionspace Integration " VER_PRODUCTVERSION_STR " Card Library"

// Dispatch IDs format: 0xCCIIIIMM, where:
//   C - component [1..127]
//   I - interface [1..65535]
//   M - method [1..255]
#define DISPID(c, i, m)                     (((c & 0x7F) << 24) | ((i & 0xFFFF) << 8) | (m & 0xFF))

// Platform
#define DISPID_OBJECTMANAGER(i, m)          DISPID(0x01, i, m)
#define DISPID_SECURITYMANAGER(i, m)        DISPID(0x02, i, m)
#define DISPID_CARDHOST(i, m)               DISPID(0x03, i, m)
#define DISPID_NAVIGATOR(i, m)              DISPID(0x04, i, m)
#define DISPID_NAVIGATOREXT(i, m)           DISPID(0x05, i, m)
#define DISPID_HELPERAPI(i, m)              DISPID(0x06, i, m)
//#define DISPID_INFOPATH_CARD(i, m)          DISPID(0x07, i, m)
#define DISPID_PROPPAGE_D(i, m)             DISPID(0x08, i, m)
#define DISPID_PROPPAGE_R(i, m)             DISPID(0x09, i, m)
#define DISPID_TOCARDLIB(i, m)              DISPID(0x0A, i, m)
#define DISPID_STORAGESERVER_PROXY(i, m)    DISPID(0x0B, i, m)
#define DISPID_WINDOWHOOK(i, m)             DISPID(0x0C, i, m)
#define DISPID_CRYPTUTIL(i, m)              DISPID(0x0D, i, m)
#define DISPID_FORMCONTROLS(i, m)           DISPID(0x0E, i, m)
#define DISPID_PERFUTIL(i, m)               DISPID(0x0F, i, m)
#define DISPID_NAVIGATORHOST(i, m)          DISPID(0x10, i, m)

// Offline Client
#define DISPID_OUTLOOKADDIN(i, m)           DISPID(0x21, i, m)
#define DISPID_OFFICEADDIN(i, m)            DISPID(0x22, i, m)
#define DISPID_PERSONALSTORE(i, m)          DISPID(0x23, i, m)
#define DISPID_PERSONALSTORE_PROXY(i, m)    DISPID(0x24, i, m)
#define DISPID_SYNCAGENT(i, m)              DISPID(0x25, i, m)
