import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class SimpleBoxEditing extends Plugin {
  init() {
    console.log("SimpleBoxEditing#init() got called");

    this._defineSchema();
    this._defineConverters(); // ADDED
  }

  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register("simpleBox", {
      // Behaves like a self-contained object (e.g. an image).
      isLimit: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: "$block",
    });

    schema.register("simpleBoxTitle", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "simpleBox",

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: "$block",
    });

    schema.register("simpleBoxDate", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "simpleBox",

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: "$block",
    });
    schema.register("editorBodyBox", {
      isObject: true,
      allowWhere: "$block",
    });
    schema.register("articleBox", {
      isContent: true,
      allowIn: "editorBodyBox",
      allowContentOf: "$root",
    });
  }

  _defineConverters() {
    // ADDED
    const conversion = this.editor.conversion;

    conversion.elementToElement({
      model: "simpleBox",
      view: {
        name: "section",
        classes: "editor-head-box",
      },
    });

    conversion.elementToElement({
      model: "simpleBoxTitle",
      view: {
        name: "h1",
        classes: "editor-title",
      },
    });

    conversion.elementToElement({
      model: "simpleBoxDate",
      view: {
        name: "div",
        classes: "editor-date",
      },
    });
    conversion.elementToElement({
      model: "editorBodyBox",
      view: {
        name: "section",
        classes: "editor-body-box",
      },
    });
    conversion.elementToElement({
      model: "articleBox",
      view: {
        name: "div",
        classes: "article",
      },
    });
  }
}
