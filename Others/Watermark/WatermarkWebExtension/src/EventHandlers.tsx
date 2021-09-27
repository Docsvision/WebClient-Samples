import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { $WatermarkService, WatermarkService } from "./WatermarkService";
import { $CardId } from "@docsvision/webclient/System/LayoutServices";
import { $FileService } from "@docsvision/webclient/System/$FileService";
import { FileListControl } from "@docsvision/webclient/BackOffice/FileListControl";
import { LayoutControl } from "@docsvision/webclient/System/BaseControl";
import { showError, showNotify } from "./Utils";

// Обработчик для события нажатия иконки добавления водяных знаков
export async function addWatermark(sender: LayoutControl) {
   showNotify("Запущен процесс добавления водяных знаков");

   // Получаем ИД текущей карточки и список файлов из элемента FileList
   let cardId = sender.layout.getService($CardId);
   let files = sender.layout.getService($FileService).getFiles();

   let fileIDs = new Array();

   // Получаем из модели files только идентификаторы файлов
   files.forEach((item) => {
      // Обрабатываем только основные файлы с расширением PDF
      if (item.data.isMain && item.data.name.toLowerCase().endsWith(".pdf")) {
         fileIDs.push(item.data.fileId);
      }
   })

   // Получаем реализованный сервис для работы с водяными знаками
   let watermarkService = sender.layout.getService($WatermarkService);

   // Вызываем функцию добавления водяных знаков для файлов с ИД из списка fileIDs
   let response = await watermarkService.AddWatermarkToFiles(cardId, fileIDs);

   if (response.success == false) {
      showError(response.errorMessage);
   } else {
      showNotify(response.data.message);

      if (layoutManager.cardLayout == null)
         return;

      let currentCardId = sender.layout.getService($CardId);
      if (currentCardId == cardId) {
         // Обновляем список файлов, если есть (возможно уже открыта другая карточка, но в данном случае это не существенно)
         let fileList = layoutManager.cardLayout.controls.get<FileListControl>("fileList");
         await fileList.reloadFromServer();
      }
   }
}