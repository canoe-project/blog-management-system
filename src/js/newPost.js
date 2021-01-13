import ClassicEditor from "@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";

import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment"; // <--- ADDED
const $template = $(".template");
const $editorContainer = $(".editorContainer");
const $editorClose = $(".editorClose");
const $selectorToggle = $(".selectorToggle");
const $postSelectorList = $(".postSelectorList");
const $selectorItem = $(".selectorItem");

let editorDoc; //에디터 인스턴스 저장 필드

const domain = "localhost:3000";

ClassicEditor.create(document.querySelector("#editor"), {
  plugins: [Essentials, Paragraph, Bold, Italic, Alignment], // <--- MODIFIED
  toolbar: ["bold", "italic", "alignment"], // <--- MODIFIED
})
  .then((editor) => {
    editorDoc = editor;
  })
  .catch((error) => {
    console.error(error.stack);
  });

$template.on("click", (e) => {
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
