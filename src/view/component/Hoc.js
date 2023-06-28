/**
 * @return {null}
 */

export default function WrapperHOC(props) {
  const children = props.children;

  if (!children) return null;

  return props.children;

  /*if (children.key !== 'Sun') {
    return props.children;
  } else {
    return null;
  }*/
}
