import Mirador from 'mirador/dist/es/src/index';

const params = new URLSearchParams(location.search)

var manifest = params.get('m')
var canvas = params.get('c')

if (manifest && canvas) {
  console.log ('detected URL params')
} else {
  console.log ('detected InvenioRDM preview URL')

  //compute manifest URL from InvenioRDM preview URL
  manifest = location.href.split('?')[0]
  manifest=manifest.replace('records/','api/iiif/record:');
  manifest=manifest.replace(/preview.+$/, 'manifest');

  canvas = location.href.split('?')[0]
  canvas=canvas.replace('records/','api/iiif/record:');
  canvas=canvas.replace('/preview/', '/canvas/');

  if (params.get('preview')) {
    manifest = manifest.replace('record:','draft:');
    canvas = canvas.replace('record:','draft:');
  }

}

  console.log(manifest)
  console.log(canvas)

const config = {
  id: 'm3-dist',
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
  windows: [{
    manifestId: manifest,
    canvasId: canvas,
  }],
};

Mirador.viewer(config);
