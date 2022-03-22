const extendPermissionsMap = (previousPermissionsMap, newPermissions) => {
  const newPermissionsMap =
    newPermissions?.reduce((result, permission) => {
      return { ...result, [permission.id]: permission };
    }, {}) ?? {};

  const permissionsMap = {
    ...(previousPermissionsMap ?? {}),
    ...newPermissionsMap,
  };

  return permissionsMap;
};

export { extendPermissionsMap };
