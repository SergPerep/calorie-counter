interface Body {
  [key: string]: any;
}

const buildStringCases = (body: Body, fieldName: string) => {
  const cases = ["", undefined].map((value) => {
    const updatedBody = { ...body };
    updatedBody[fieldName] = value;
    return {
      body: updatedBody,
      emptyField: fieldName,
    };
  });
  return cases;
};

const buildRestCases = (body: Body, fieldName: string) => {
  const updatedBody = { ...body };
  delete updatedBody[fieldName];
  return [
    {
      body: updatedBody,
      emptyField: fieldName,
    },
  ];
};

const genEmptyFieldCases = (body: Body) => {
  const fieldNames = Object.keys(body);
  const finalCases = fieldNames.reduce(
    (total: { body: Body; emptyField: string }[], fieldName) => {
      let cases = [];
      switch (typeof body[fieldName]) {
        case "string":
          cases = buildStringCases(body, fieldName);
          break;
        default:
          cases = buildRestCases(body, fieldName);
      }
      return [...total, ...cases];
    },
    []
  );
  return finalCases;
};

export default genEmptyFieldCases;
