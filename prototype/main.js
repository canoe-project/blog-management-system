(function ($) {
  var $workStation = $("#workStation"),
    $documentSelect = $("#documentSelect"),
    $documentExplorer = $(".documentExplorer"),
    $explorerButton = $(".explorerButton"),
    $noticeDocument = $(".documentExplorer>#noticeContainer"),
    $writingDocument = $(".documentExplorer>#writingContainer"),
    $pictureDocument = $(".documentExplorer>#pictureContainer"),
    $titleList = $(".titleList");

  let editorDoc; //에디터 인스턴스 저장 필드
  const domain = "localhost:3000";

  $(() => {
    DecoupledEditor.create(document.querySelector("#editor"))
      .then((editor) => {
        const toolbarContainer = document.querySelector("#toolbar-container");

        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        editorDoc = editor;
      })
      .catch((error) => {
        console.error(error);
      });
  });

  //텍스트 에디터에 있는 정보를 서버로 부터 전달하여 db에 글을 등록하는 메소드
  const saveDocument = () => {
    $.post(`http://${domain}/uploader/create`, {
      data: editorDoc.getData(),
      date: new Date(),
    }).done((result) => {
      console.log(result);
    });
  };

  $.fn.loadDocumentList = function () {
    $(this).on("click", () => {
      $.post(`http://${domain}/uploader/documenttitle`, {
        collection: $(this).text(),
      }).done((result) => {
        result.forEach((element) => {
          $(this)
            .parent()
            .children("ul")
            .append(
              `<li class="titleList" data-id="${
                element._id
              }" data-collection="${$(this).text()}" >${element.title}</li>`
            );
        });
      });
    });
  };

  $.fn.loadDocument = function () {
    $(this).on("click", (e) => {
      $.post(`http://${domain}/uploader/document`, {
        collection: $(e.target).data("collection"),
        id: $(e.target).data("id"),
      }).done(async (result) => {
        editorDoc.setData(result[0].contents);
      });
    });
  };

  $(document).on("mouseup", (e) => {
    if (
      !$documentExplorer.is(e.target) &&
      !$explorerButton.is(e.target) &&
      !$(".titleList").is(e.target)
    ) {
      $documentExplorer.removeClass("is-active");
      $documentSelect.removeClass("is-deactivate");
    }
  });

  $documentSelect.on("click", () => {
    $documentExplorer.toggleClass("is-active");
    $documentSelect.toggleClass("is-deactivate");
  });

  $noticeDocument.children(".explorerButton").loadDocumentList();
  $writingDocument.children(".explorerButton").loadDocumentList();
  $pictureDocument.children(".explorerButton").loadDocumentList();
  $titleList.loadDocument();
})(jQuery);
