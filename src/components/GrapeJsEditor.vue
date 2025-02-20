<template>
    <div class="panel__top">
      <div class="panel__basic-actions"></div>
      <div class="panel__devices"></div>
    </div>
  
    <div class="editor-layout">
      <!-- Left: Blocks Section -->
      <div class="blocks-section">
        <div id="blocks" class="blocks-container"></div>
      </div>
  
      <!-- Right: GrapesJS Canvas -->
      <div id="gjs" class="editor-container">
        <h1 class="editor-title">Hello World Component!</h1>
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
      panels: { defaults: [] },
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
            width: '', // default size
        },
        {
            name: 'Mobile',
            width: '320px', // this value will be used on canvas width
            widthMedia: '480px', // this value will be used in CSS @media
        },
     ]}
    });

    editor.Commands.add('set-device-desktop', {
        run: (editor) => editor.setDevice('Desktop'),
    });
    editor.Commands.add('set-device-mobile', {
        run: (editor) => editor.setDevice('Mobile'),
    });
  
    // Adding a custom block
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

    editor.Panels.addPanel({
        id: 'panel-devices',
        el: '.panel__devices',
        buttons: [
          {
            id: 'device-desktop',
            label: 'D',
            command: 'set-device-desktop',
            active: true,
            togglable: false,
          },
          {
            id: 'device-mobile',
            label: 'M',
            command: 'set-device-mobile',
            togglable: false,
          },
        ],
    });
  
    editor.Panels.addPanel({
      id: 'panel-top',
      el: '.panel__top',
    });
    editor.Panels.addPanel({
      id: 'basic-actions',
      el: '.panel__basic-actions',
      buttons: [
        {
          id: 'visibility',
          active: true,
          className: 'btn-toggle-borders',
          label: '<u>B</u>',
          command: 'sw-visibility',
        },
        {
          id: 'export',
          className: 'btn-open-export',
          label: 'Exp',
          command: 'export-template',
          context: 'export-template',
        },
        {
          id: 'show-json',
          className: 'btn-show-json',
          label: 'JSON',
          context: 'show-json',
          command(editor) {
            editor.Modal.setTitle('Components JSON')
              .setContent(
                `<textarea style="width:100%; height: 250px;">
                ${JSON.stringify(editor.getComponents())}
              </textarea>`
              )
              .open();
          },
        },
      ],
    });
  });
  </script>
  
  
  <style scoped>
  /* Editor Container */
  .editor-container {
    border: 2px solid #e1e4e8;
    padding: 20px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    margin-bottom: 20px;
  }
  
  .editor-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 16px;
  }
  
  /* Blocks Section */
  .blocks-section {
    width: 100%;
    margin-top: 20px;
  }
  
  .blocks-heading {
    font-size: 20px;
    font-weight: bold;
    color: #4a047e;
    margin-bottom: 10px;
    text-align: left;
    padding-left: 20px;
  }
  
  /* Main Layout */
.editor-layout {
  display: flex;
  width: 100%;
  height: 100vh; /* Full height */
}

/* Blocks Section (Left) */
.blocks-section {
  width: 300px; /* Fixed width for the blocks */
  background-color: #473869;
  padding: 20px;
  overflow-y: auto;
  border-right: 2px solid #ddd;
}

.blocks-heading {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
  text-align: center;
}

.blocks-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #473869;
}

  
  /* Block Styling */
  .gjs-block {
    width: 150px;
    height: auto;
    min-height: 100px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  
  .gjs-block:hover {
    background-color: #f3f3f3;
  }
  
  .gjs-block-section {
    background-color: #f0f5ff;
    padding: 15px;
    border-radius: 8px;
  }
  
  /* Panels */
  .panel__top {
  padding: 0;
  width: 100%;
  display: flex;
  position: initial;
  justify-content: center;
  justify-content: space-between;
}
.panel__basic-actions {
  position: initial;
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
    transition: background-color 0.3s;
  }
  
  .btn-toggle-borders:hover,
  .btn-open-export:hover,
  .btn-show-json:hover {
    background-color: #6a1b9a;
  }
  
  textarea {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 4px;
    font-size: 14px;
    background-color: #f9f9f9;
  }

  .panel__devices {
  position: initial;
}
  </style>
  