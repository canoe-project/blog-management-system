const $template = $(".template");
const $editorContainer = $(".editorContainer");
const $editorClose = $(".editorClose");
const $selectorToggle = $(".selectorToggle");
const $postSelectorList = $(".postSelectorList");
const $selectorItem = $(".selectorItem");

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

$(".template").on("click", (e) => {
  $editorContainer.removeClass("off");
  // console.log($(e.target).attr("id"));
});
$editorClose.on("click", () => {
  $editorContainer.toggleClass("off");
});
$selectorToggle.on("click", () => {
  $postSelectorList.toggleClass("off");
});
$selectorItem.on("click", () => {
  // $(".postSelector").text($(this).text());
  console.log($(this));
  $postSelectorList.toggleClass("off");
});
