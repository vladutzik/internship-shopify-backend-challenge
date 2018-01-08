import _ from 'lodash';

export default (menu) => {
  const menuItemsById = _.keyBy(menu, 'id');
  const rootMenuItems = menu.filter(item => !item.parent_id);

  const validateMenu = (item, parents = []) => {
    const valid = !parents.includes(item.id);
    let children = [{ valid }];

    if (valid) {
        children = item.child_ids.map(child => validateMenu(menuItemsById[child], [...parents, item.id]), item.parents);
    }

    // if any of children is invalid, then we'll propagate the invalidity statu to all the children up on three untill we reach root.
    const invalidChildren = children.filter(child => child.valid === false) || [];
    
    let childIds = children.reduce((col, child) => {
      return [...(child.children || []), ...col];
    }, []);

    if (valid) {
      childIds = [...item.child_ids, ...childIds];
    }

    return {
      ...item,
      valid: Boolean(invalidChildren.length && valid),
      children: childIds,
    }
  }


  const menuTree = rootMenuItems.map(item => {
    const tree = validateMenu(item);
    const isMenuValid = tree.valid;
    
    return {
      root_id: item.id,
      children: tree.children,
      valid: isMenuValid ? 'valid_menus' : 'invalid_menus',
    };
    
  });

  const groupedResponse = _.groupBy(menuTree, 'valid');

  const result = Object.keys(groupedResponse).reduce((col, key) => {
    return {
      ...col,
      [key]: groupedResponse[key].map(item => _.omit(item, 'valid')),
    }
  }, {});

  return result;
}