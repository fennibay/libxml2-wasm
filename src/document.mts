// @ts-ignore
import { XmlError, xmlDocGetRootElement, xmlFreeDoc, xmlNewDoc } from './libxml2.mjs';
import { XmlElement } from './nodes.mjs';

export default class XmlDocument {
    _docPtr: number;

    constructor(xmlDocPtr?: number) {
        this._docPtr = xmlDocPtr ?? xmlNewDoc();
    }

    dispose() {
        xmlFreeDoc(this._docPtr);
    }

    get(xPath: string) {
    }

    get root(): XmlElement {
        const root = xmlDocGetRootElement(this._docPtr);
        if (!root) {
            // TODO: get error information from libxml2
            throw new XmlError();
        }
        return new XmlElement(this, root);
    }
}
