import Mirador from 'mirador/dist/es/src/index';

const params = new URLSearchParams(location.search)

var manifest = params.get('m')
var canvas = params.get('c')
var config = {}
var annotations = {}

if (manifest && canvas) {
  console.log ('detected URL params')
} else {
  console.log ('detected InvenioRDM preview URL')
  manifest = document.getElementById('m3-dist').getAttribute('data-manifest');
  canvas = document.getElementById('m3-dist').getAttribute('data-canvas');
  config = JSON.parse(document.getElementById('m3-dist').getAttribute('data-config'));
  annotations = JSON.parse(document.getElementById('m3-dist').getAttribute('data-annotations'));
}

  console.log(manifest)
  console.log(canvas)

function initMirador({ id, manifest, canvas, config, annotations }) {
  const defaultConfig = {
    workspaceControlPanel: {
      enabled: false,
    },
    window: {
      allowClose: false,
      allowFullscreen: true,
      allowTopMenuButton: true,
      allowMaximize: false,
      allowWindowSideBar: true,
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
    ...(config || {}),
  };
  console.log(mergedConfig);
  Mirador.viewer(mergedConfig);
}

initMirador({
  id: 'm3-dist',
  manifest: manifest,
  canvas: canvas,
  config: config,
  annotations: annotations
});
