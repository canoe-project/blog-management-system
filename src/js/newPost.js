// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import decouplededitor from "@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor";
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
import Font from "@ckeditor/ckeditor5-font/src/font";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
// import SimpleBox from "./simpleBox/simplebox.js";
// import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

const $template = $(".template"),
  $editorContainer = $(".document-editor"),
  $editorClose = $(".editorClose"),
  $selectorToggle = $(".selectorToggle"),
  $postSelectorList = $(".postSelectorList"),
  $selectorItem = $(".selectorItem"),
  $save = $(".save");

let editorDoc; //에디터 인스턴스 저장 필드

const domain = "localhost:3000";

decouplededitor
  .create(document.querySelector(".document-editor__editable"), {
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
      Font,
      MediaEmbed,
      CodeBlock,
    ], // <--- MODIFIED
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "alignment", // <--- ADDED
        "bulletedList",
        "numberedList",
        "|",
        "blockQuote",
        "link",
        "|",
        "imageUpload",
        "mediaEmbed",
        "codeBlock",
        "|",
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
    codeBlock: {
      languages: [
        { language: "plaintext", label: "Plain text" }, // The default language.
        { language: "c", label: "C" },
        { language: "cs", label: "C#" },
        { language: "cpp", label: "C++" },
        { language: "css", label: "CSS" },
        { language: "diff", label: "Diff" },
        { language: "html", label: "HTML" },
        { language: "java", label: "Java" },
        { language: "javascript", label: "JavaScript" },
        { language: "php", label: "PHP" },
        { language: "python", label: "Python" },
        { language: "ruby", label: "Ruby" },
        { language: "typescript", label: "TypeScript" },
        { language: "xml", label: "XML" },
      ],
    },
  })
  .then((editor) => {
    const toolbarContainer = document.querySelector(
      ".document-editor__toolbar"
    );

    toolbarContainer.appendChild(editor.ui.view.toolbar.element);

    editorDoc = editor;
    $(".editor-date").text(getFormatDate(new Date()));
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
  // $.post(`http://${domain}/manager/createPost`, {
  //   post: {
  //     category: $(".selectItem").text().toLowerCase(),
  //   },
  //   category: $(".selectItem").text().toLowerCase(),
  // });
});

$.fn.selectItem = function () {
  $(this).on("click", () => {
    $(".selectNow").removeClass("selectNow");
    $(".postIcon").removeClass(`${$(this).text().toLowerCase()}`);

    $(this).addClass("selectNow");
    $(".postIcon").addClass(`${$(this).text().toLowerCase()}`);
    $(".selectItem").text($(this).text());
    $postSelectorList.toggleClass("off");
  });
};
for (var i = 0; i < $selectorItem.length; i++) {
  $($selectorItem[i]).selectItem();
}

function getFormatDate(date) {
  var year = date.getFullYear();
  var month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  var day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return `published ${year}.${month}.${day}`;
}
