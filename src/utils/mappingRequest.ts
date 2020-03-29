export function mappingRequest(req: any, data: any): any {
  for (const key of Object.keys(data)) {
    const findFilterByKey = req.parsed.filter.find(
      (item: any) => item.field === key,
    );
    if (findFilterByKey) {
      req.parsed.filter = req.parsed.filter.map((item: any) => {
        if (item.field === key) {
          item = {
            ...item,
            value: data[key],
          };
        }
        return item;
      });
    } else {
      req.parsed.filter.push({ field: key, operator: 'eq', value: data[key] });
    }

    if (req.parsed.search.$and) {
      const findSearchAnd = req.parsed.search.$and.find(
        (item: any) => item && item[key],
      );
      if (findSearchAnd) {
        req.parsed.search.$and = req.parsed.search.$and.map((item: any) => {
          if (item && item[key]) {
            item[key].eq = data[key];
          }
          return item;
        });
      } else {
        const searchAnd = {};
        searchAnd[key] = { eq: data[key] };
        req.parsed.search.$and.push(searchAnd);
      }
    }
  }

  return req;
}

/**
 * {"parsed":{"fields":[],"paramsFilter":[],"search":{"$and":[null,{},{"type":{"eq":"COMPANY"}}]},"filter":[{"field":"type","operator":"eq","value":"COMPANY"},{"field":"company_id","operator":"eq","value":"bubu"}],"or":[],"join":[{"field":"keyresults"}],"sort":[{"field":"created_at","order":"ASC"}],"cache":0},"options":{"query":{"alwaysPaginate":false,"join":{"keyresults":{"exclude":[]}}},"routes":{"getManyBase":{"interceptors":[],"decorators":[]},"getOneBase":{"interceptors":[],"decorators":[]},"createOneBase":{"interceptors":[],"decorators":[],"returnShallow":false},"createManyBase":{"interceptors":[],"decorators":[]},"updateOneBase":{"interceptors":[],"decorators":[],"allowParamsOverride":false,"returnShallow":false},"replaceOneBase":{"interceptors":[],"decorators":[],"allowParamsOverride":false,"returnShallow":false},"deleteOneBase":{"interceptors":[],"decorators":[],"returnDeleted":false}},"params":{"id":{"field":"id","type":"string","primary":true}}}}
 *
 */
