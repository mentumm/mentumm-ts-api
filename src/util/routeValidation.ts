export const routeValidation = (
  schema: any,
  property: "body" | "query" | "params"
) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(500).send(error.message);
    }
    next();
  };
};
