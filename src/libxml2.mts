import module_loader, { XmlDocPtr, XmlNodePtr } from './libxml2raw.js';

const libxml2 = await module_loader();

function withStringUTF8<R>(str: string, process: (buf: number, len: number) => R): R {
    const len = libxml2.lengthBytesUTF8(str);
    const buf = libxml2._malloc(len + 1);
    libxml2.stringToUTF8(str, buf, len + 1);
    const ret = process(buf, len);
    libxml2._free(buf);
    return ret;
}

export function getXmlNodeName(node: XmlNodePtr): string {
    return libxml2.UTF8ToString(libxml2.getValue(node + 8, '*'));
}

export function xmlReadMemory(xmlString: string): XmlDocPtr {
    return withStringUTF8(xmlString, (buf, len) => libxml2._xmlReadMemory(buf, len, 0, 0, 0));
}

export function xmlFreeDoc(doc: XmlDocPtr) {
    libxml2._xmlFreeDoc(doc);
}

export const xmlNewDoc = libxml2._xmlNewDoc;
export const xmlXPathNewContext = libxml2._xmlXPathNewContext;
export const xmlXPathFreeContext = libxml2._xmlXPathFreeContext;
export const xmlDocGetRootElement = libxml2._xmlDocGetRootElement;
