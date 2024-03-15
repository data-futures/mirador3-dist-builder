import Mirador from 'mirador/dist/es/src/index';
import annotationPlugins from 'mirador-annotations/es/index';
import InvenioRDMAdapter from 'mirador-annotations/es/InvenioRDMAdapter';

const params = new URLSearchParams(location.search);
var endpointUrl="/api/records";
var manifest = params.get('m');
var canvas = params.get('c');

if (manifest && canvas) {
  console.log ('detected URL params');
} else {
  console.log ('detected Invenio preview URL');

  //compute manifest URL from Annotot preview URL
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
  annotation: {
    adapter: (canvasId) => new InvenioRDMAdapter(canvasId, endpointUrl)
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
    sideBarOpen: true,
    switchCanvasOnSearch: false,
    sideBarPanel: 'annotations',
    highlightAllAnnotations: true,
    panels: {
      info: true,
      attribution: false,
      canvas: false,
      annotations: true,
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

//Mirador.viewer(config);
Mirador.viewer(config, [...annotationPlugins]);
