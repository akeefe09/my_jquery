class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(arg) {
    if (typeof arg === "string") {
      this.nodes.forEach(node => {
        node.innerHTML = arg;
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.nodes.forEach((node) => {
      node.innerHTML = '';
    });
  }

  append(children) {
    if (children instanceof DOMNodeCollection) {
      this.nodes.forEach(node => {
        children.nodes.forEach((childNode) => {
          node.appendChild(child.cloneNode(true));
        });
      });
    } else if (typeof children === "string") {
      this.nodes.forEach((node) => {
        node.innerHTML += children;
      });
    } else {
      return;
    }
  }

  children() {
    let childNodes = [];
    this.nodes.forEach((node) => {
      childNodes = childNodes.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(childNodes);
  }

  parentals() {
    let parentsArray = [];
    this.nodes.forEach((node) => {
      if(!parentsArray.includes(node.parentNode)) {
        parentsArray.push(node.parentNode);
      }
    });
    return new DOMNodeCollection(parentsArray);
  }

  find(selector) {
    let found = [];
    for (let i = 0; i < this.nodes.length; i++) {
      const foundNode = Array.from(this.nodes[i].querySelectorAll(selector));
      found = found.concat(Array.from(foundNode));
    }
    return new DOMNodeCollection(found);
  }

  remove() {
    this.nodes.forEach((node) => {
      node.parentNode.removeChild(node);
    });
  }

  removeClass(classArg) {
    this.nodes.forEach((node) => {
      node.classList.remove(classArg);
    });
  }

  addClass(classArg) {
    this.nodes.forEach((node) => {
      node.classList.add(classArg);
    });
  }

  toggleClass(classArg) {
    this.nodes.forEach((node) => {
      node.classList.toggle(classArg);
    });
  };

  attr(attribute, property) {
    if (!property) {
      return this.nodes[0].getAttribute(attribute);
    } else if(typeof property === "string") {
      return this.nodes[0].setAttribute(attribute, property);
    }
  }

  on(e, fn) {
    this.nodes.forEach((node) => {
      node.addEventListener(e, fn);
      const eventKey = `jqliteEvents-${e}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(fn);
    });
  }

  off(e, fn) {
    this.nodes.forEach((node) => {
      const eventKey = `jqliteEvents-${e}`;
      if (node[eventKey]) {
        node[eventKey].forEach((cb) => {
          node.removeEventListener(e, cb)
        });
      }
      el[eventKey] = [];
    });
  }

}

module.exports = DOMNodeCollection;
