export function getByXpath(path: string): Node | null {
  const node: XPathResult = document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  );

  return node.singleNodeValue;
}
