import 'reveal.js/lib/js/head.min';
import Reveal from 'reveal.js';
import hljs from 'highlight.js';

export default function slides() {
    Reveal.initialize();
    hljs.initHighlightingOnLoad();
}

