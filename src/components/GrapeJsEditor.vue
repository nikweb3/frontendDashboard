<template>
    <div class="editor-layout">
        <div id="gjs" class="editor-container">
            <h1 class="editor-title">My first Report!</h1>
        </div>

        <div class="layers-section">
    <div class="layers-content">
        <div id="layers" class="styles-container"></div>
        <div class="traits-container"></div>   
        <div id="blocks" class="blocks-container"></div> 
    </div>
</div>
 
    </div>
</template>
  <script setup>
  import { onMounted } from 'vue';
  import 'grapesjs/dist/css/grapes.min.css';
  import grapesjs from 'grapesjs';

  onMounted(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      height: '100vh',
      width: '100%',
      storageManager: false,
      blockManager: {
        appendTo: '#blocks',
        blocks: [
          {
            id: 'section',
            label: '<b>Section</b>',
            attributes: { class: 'gjs-block-section' },
            content: `<section>
              <h1>Nikesh's custom block</h1>
              <div>This is just a simple block</div>
            </section>`,
          },
          {
            id: 'text',
            label: 'Text',
            content: '<div data-gjs-type="text">Insert your text here</div>',
          },
          {
            id: 'image',
            label: 'Image',
            select: true,
            content: { type: 'image' },
            activate: true,
          },
        ],
      },
      deviceManager: {
        devices: [
        {
            name: 'Desktop',
            width: '', 
        },
        {
            name: 'Mobile',
            width: '320px', 
            widthMedia: '480px', 
        },
     ]},
     layerManager: {
      appendTo: '.styles-container', 
    },
    selectorManager: {
    appendTo: '.styles-container',
    },
    styleManager: 
    {
        appendTo: '.styles-container',
        sectors: [
        {
            name: 'Dimension',
            open: false,
            buildProps: ['width', 'min-height', 'padding'],
            properties: 
            [
                {
                    type: 'integer',
                    name: 'The width',
                    property: 'width', 
                    units: ['px', '%'], 
                    defaults: 'auto', 
                    min: 0,
                },
            ],
       },
       {
            name: 'Extra',
            open: false,
            buildProps: ['background-color', 'box-shadow', 'custom-prop'],
            properties: 
            [
                {
                    id: 'custom-prop',
                    name: 'Custom Label',
                    property: 'font-size',
                    type: 'select',
                    defaults: '32px',
                    options: [
                        { value: '12px', name: 'Tiny' },
                        { value: '18px', name: 'Medium' },
                        { value: '32px', name: 'Big' },
                    ],
                },
            ],
       },
       {
            name: 'Typography',
            open: false,
            buildProps: ['font-family', 'font-size', 'font-weight', 'color', 'letter-spacing', 'line-height', 'text-align'],
            properties: [
            {
                    name: 'Font Family',
                    property: 'font-family',
                    type: 'select',
                    defaults: 'Arial',
            options: [
                    { value: 'Arial', name: 'Arial' },
                    { value: 'Verdana', name: 'Verdana' },
                    { value: 'Times New Roman', name: 'Times New Roman' },
                    { value: 'Courier New', name: 'Courier New' },
                ],
            },
            {
                    name: 'Text Align',
                    property: 'text-align',
                    type: 'radio',
                    defaults: 'left',
            options: [
                    { value: 'left', name: 'Left' },
                    { value: 'center', name: 'Center' },
                    { value: 'right', name: 'Right' },
                    { value: 'justify', name: 'Justify' },
                ],
            },
            {
                    name: 'Letter Spacing',
                    property: 'letter-spacing',
                    type: 'integer',
                    units: ['px'],
                    defaults: 0,
                    min: -5,
            },],
    },
    {
            name: 'Borders',
            open: false,
            buildProps: ['border-width', 'border-style', 'border-color', 'border-radius'],
            properties: [
            {
                    name: 'Border Width',
                    property: 'border-width',
                    type: 'integer',
                    units: ['px'],
                    defaults: 1,
                    min: 0,
            },
            {
                    name: 'Border Style',
                    property: 'border-style',
                    type: 'select',
                    defaults: 'solid',
                    options: [
                        { value: 'none', name: 'None' },
                        { value: 'solid', name: 'Solid' },
                        { value: 'dashed', name: 'Dashed' },
                        { value: 'dotted', name: 'Dotted' },
                    { value: 'double', name: 'Double' },
                    ],
            },
            {
                    name: 'Border Color',
                    property: 'border-color',
                    type: 'color',
                    defaults: 'black',
            },
            {
                    name: 'Border Radius',
                    property: 'border-radius',
                    type: 'integer',
                    units: ['px', '%'],
                    defaults: 0,
            },
        ],
    },
    {
            name: 'Flexbox',
            open: false,
            buildProps: ['display', 'flex-direction', 'justify-content', 'align-items', 'gap'],
            properties: [
            {
                    name: 'Display',
                    property: 'display',
                    type: 'select',
                    defaults: 'block',
                    options: [
                        { value: 'block', name: 'Block' },
                        { value: 'flex', name: 'Flex' },
                        { value: 'grid', name: 'Grid' },
                    ],
            },
            {
                    name: 'Flex Direction',
                    property: 'flex-direction',
                    type: 'radio',
                    defaults: 'row',
                    options: [
                        { value: 'row', name: 'Row' },
                        { value: 'column', name: 'Column' },
                        { value: 'row-reverse', name: 'Row Reverse' },
                        { value: 'column-reverse', name: 'Column Reverse' },
                    ],
            },
            {
                    name: 'Justify Content',
                    property: 'justify-content',
                    type: 'select',
                    defaults: 'flex-start',
                    options: [
                        { value: 'flex-start', name: 'Start' },
                        { value: 'center', name: 'Center' },
                        { value: 'flex-end', name: 'End' },
                        { value: 'space-between', name: 'Space Between' },
                        { value: 'space-around', name: 'Space Around' },
                    ],
            },
            {
                    name: 'Align Items',
                    property: 'align-items',
                    type: 'select',
                    defaults: 'stretch',
                    options: [
                        { value: 'stretch', name: 'Stretch' },
                        { value: 'center', name: 'Center' },
                        { value: 'flex-start', name: 'Start' },
                        { value: 'flex-end', name: 'End' },
                    ],
            },
            {
                    name: 'Gap',
                    property: 'gap',
                    type: 'integer',
                    units: ['px'],
                    defaults: 0,
            },
        ],
    },
    {
            name: 'Background',
            open: false,
            buildProps: ['background-image', 'background-size', 'background-repeat', 'opacity'],
            properties: [
            {
                    name: 'Background Image',
                    property: 'background-image',
                    type: 'file',
            },
            {
                    name: 'Background Size',
                    property: 'background-size',
                    type: 'select',
                    defaults: 'cover',
                    options: [
                        { value: 'auto', name: 'Auto' },
                        { value: 'cover', name: 'Cover' },
                        { value: 'contain', name: 'Contain' },
                    ],
            },
            {
                    name: 'Background Repeat',
                    property: 'background-repeat',
                    type: 'select',
                    defaults: 'no-repeat',
                    options: [
                        { value: 'no-repeat', name: 'No Repeat' },
                        { value: 'repeat', name: 'Repeat' },
                        { value: 'repeat-x', name: 'Repeat X' },
                        { value: 'repeat-y', name: 'Repeat Y' },
                    ],
            },
            {
                    name: 'Opacity',
                    property: 'opacity',
                    type: 'slider',
                    defaults: 1,
                    step: 0.1,
                    min: 0,
                    max: 1,
            },
        ],
    }]}});

    editor.Commands.add('show-layers', {
        getRowEl(editor) {
            return editor.getContainer().closest('.editor-row');
        },
        getLayersEl(row) {
            return row.querySelector('.layers-container');
        },
        run(editor, sender) {
            const lmEl = this.getLayersEl(this.getRowEl(editor));
            lmEl.style.display = 'block';
        },
        stop(editor, sender) {
            const lmEl = this.getLayersEl(this.getRowEl(editor));
            lmEl.style.display = 'block';
        },
    });

    editor.Commands.add('show-styles', {
        getRowEl(editor) {
            return editor.getContainer().closest('.editor-row');
        },
        getStyleEl(row) {
            return row.querySelector('.styles-container');
        },
        run(editor, sender) {
            const smEl = this.getStyleEl(this.getRowEl(editor));
            smEl.style.display = 'block';
        },
        stop(editor, sender) {
            const smEl = this.getStyleEl(this.getRowEl(editor));
            smEl.style.display = 'block';
        },
    });


    editor.Commands.add('set-device-desktop', {
        run: (editor) => editor.setDevice('Desktop'),
    });
    editor.Commands.add('set-device-mobile', {
        run: (editor) => editor.setDevice('Mobile'),
    });
  
    editor.BlockManager.add('custom-block', {
      label: 'Custom Block',
      category: 'Custom',
      content: {
        tagName: 'div',
        draggable: true,
        attributes: { class: 'custom-block' },
        components: [
          {
            tagName: 'span',
            content: '<b>Nikeshs custom static content block</b>',
          },
          {
            tagName: 'div',
            components: '<span>HTML content goes here</span>',
          },
        ],
      },
    });
  
    editor.BlockManager.add('button', {
        label: 'Button',
        category: 'Basic',
        content: '<button class="btn">Click Me</button>',
    });

    editor.BlockManager.add('column', {
        label: 'Column Layout',
        category: 'Layout',
        content: `<div class="row">
                    <div class="col">Column 1</div>
                    <div class="col">Column 2</div>
                </div>`,
    }); 
  });
  </script>
  
  <style scoped>
.editor-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  background: #2c2c2c;
}

.blocks-section, .layers-section {
  width: 300px;
  background: #3b2d56;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.editor-container {
  flex: 1;
  background: #473869;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.editor-title {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 16px;
  text-align: center;
}

.blocks-heading {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
  text-align: center;
}

.blocks-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #3b2d56;
}

.gjs-block {
  width: 100%;
  min-height: 100px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.gjs-block:hover {
  background-color: #e0e0e0;
  transform: scale(1.05);
}

.styles-container {
  display: block;
  width: 300px;
  background: #3b2d56;
  padding: 15px;
  border-radius: 8px;
}

.btn-toggle-borders,
.btn-open-export,
.btn-show-json {
  background-color: #4a047e;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-toggle-borders:hover,
.btn-open-export:hover,
.btn-show-json:hover {
  background-color: #6a1b9a;
  transform: scale(1.05);
}

textarea {
  width: 100%;
  height: 250px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f9f9f9;
  resize: none;
}

#layers {
  width: 100%;
  background-color: #3b2d56;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 0px;
}

.layers-section {
    width: 300px;
    display: flex;
    flex-direction: column;
    background: #3b2d56;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    height: 100vh; 
    overflow: hidden; 
}

.layers-content {
    flex: 1;
    overflow-y: auto; 
    scrollbar-gutter: stable;
}

.layers-content::-webkit-scrollbar {
    width: 8px;
}

.layers-content::-webkit-scrollbar-thumb {
    background: #6a1b9a;
    border-radius: 4px;
}

.layers-content::-webkit-scrollbar-track {
    background: #3b2d56;
}

</style>
  