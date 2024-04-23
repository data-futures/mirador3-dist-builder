import Mirador from 'mirador/dist/es/src/index';

function initMirador({ id }) {
  const params = new URLSearchParams(location.search);
  var manifest = params.get('m');
  var canvas = params.get('c');

  const el = document.getElementById(id);
  let config = {}, annotations = {};

  if (manifest && canvas) {
    console.log('Detected URL params');
  } else if (el) {
    console.log('Detected InvenioRDM preview URL');
    manifest = el.dataset.manifest;
    canvas = el.dataset.canvas;
    config = JSON.parse(el.dataset.config || '{}');
    annotations = JSON.parse(el.dataset.annotations || '{}');
  } else {
    console.error('Manifest and canvas not provided.');
    return;
  }

  console.log('Manifest:', manifest);
  console.log('Canvas:', canvas);

  const defaultConfig = {
    workspaceControlPanel: {
      enabled: false,
    },
    window: {
      allowClose: false,
      allowFullscreen: true,
      allowTopMenuButton: true,
      allowMaximize: false,
      allowWindowSideBar: false,
      defaultSidebarPanelHeight: 201,
      defaultSidebarPanelWidth: 235,
      defaultView: 'xsingle',
      hideWindowTitle: true,
      sideBarOpen: false,
      switchCanvasOnSearch: false,
      panels: {
        info: true,
        attribution: false,
        canvas: false,
        annotations: false,
        search: false,
        layers: false,
      },
      views: [
        { key: 'single', behaviors: ['individuals'] },
        { key: 'book', behaviors: ['paged'] },
        { key: 'scroll', behaviors: ['continuous'] },
        { key: 'gallery' },
      ],
    },
  };

  const mergedConfig = {
    id: id,
    windows: [{
      manifestId: manifest,
      canvasId: canvas,
      thumbnailNavigationPosition: "far-bottom",
    }],
    ...defaultConfig,
    ...config,
  };
  console.log('Merged Config:', mergedConfig);
  Mirador.viewer(mergedConfig);
}

initMirador({
  id: 'm3-dist',
});
