<<<<<<<< HEAD:Controls/DownloadFilesGroupOperation/DownloadFilesGroupOperationWebExtension/copy-path.js
const ROOT = process.env.SamplesOutput || "../../../SamplesOutput"
const SITE_ROOT = `${ROOT}/Site`;
const EXTENSION_NAME = "DownloadFilesBatchOperationWebExtension";
========
const ROOT = process.env.SamplesOutput || "../../../SamplesOutput";
const SITE_ROOT = `${ROOT}/Site`;
const EXTENSION_NAME = "ShowRequiredFields";
>>>>>>>> develop:ClientScripts/TypeScript/ShowRequiredFields/copy-path.js
const MODULES_DIR = SITE_ROOT + "/Content/Modules";

module.exports.STYLES_DIR =  `${MODULES_DIR}/${EXTENSION_NAME}`;
module.exports.BUNDLE_DIR =  `${MODULES_DIR}/${EXTENSION_NAME}`;