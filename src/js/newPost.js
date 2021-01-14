import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";

import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";

const $template = $(".template"),
  $editorContainer = $(".editorContainer"),
  $editorClose = $(".editorClose"),
  $selectorToggle = $(".selectorToggle"),
  $postSelectorList = $(".postSelectorList"),
  $selectorItem = $(".selectorItem"),
  $save = $(".save");

let editorDoc; //에디터 인스턴스 저장 필드

const domain = "localhost:3000";

ClassicEditor.create(document.querySelector("#editor"), {
  plugins: [
    Essentials,
    UploadAdapter,
    Autoformat,
    Bold,
    Italic,
    BlockQuote,
    EasyImage,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Link,
    List,
    Paragraph,
    Alignment,
    Base64UploadAdapter,
  ], // <--- MODIFIED
  toolbar: {
    items: [
      "heading",
      "|",
      "alignment", // <--- ADDED
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "imageUpload",
      "blockQuote",
      "undo",
      "redo",
    ],
  },
  image: {
    toolbar: [
      "imageStyle:full",
      "imageStyle:side",
      "|",
      "imageTextAlternative",
    ],
  },
})
  .then((editor) => {
    editorDoc = editor;
  })
  .catch((error) => {
    console.error(error.stack);
  });

/*편집기 열고 닫기*/
$template.on("click", (e) => {
  $editorContainer.removeClass("off");
});
$editorClose.on("click", () => {
  $editorContainer.toggleClass("off");
});

/*카테고리 선텍자*/
$selectorToggle.on("click", () => {
  $postSelectorList.toggleClass("off");
});

$save.on("click", () => {
  console.log(editorDoc.getData());
});

$.fn.selectItem = function () {
  $(this).on("click", () => {
    $(".selectNow").removeClass("selectNow");
    $(this).addClass("selectNow");
    $(".selectItem").text($(this).text());
    $postSelectorList.toggleClass("off");
  });
};
for (var i = 0; i < $selectorItem.length; i++) {
  $($selectorItem[i]).selectItem();
}
