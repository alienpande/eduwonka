import { getToken, getHasuraToken } from "@/util/auth";
import request from "@/util/request";
import { GraphQLClient } from "graphql-request";

export function dispatchHttp(dispatch_url, data, method) {
  return request({
    url: dispatch_url,
    method: method,
    data: data,
  });
}

export function dispatchGraphql(query, variables) {
  // console.log(getHasuraToken())
  const client = new GraphQLClient(process.env.VUE_APP_BASE_API + "/graphql", {
    headers: {
      // headers
      Authorization: "Bearer " + getToken(),
      "x-hasura-token": getHasuraToken(),
      // OR "Access-Token": () => "some-access-token"
    },
  });
  return client.request(query, variables);
}

function buildFields(field) {
  let fields = "";
  for (let i = 0; i < field.length; i++) {
    console.log(field[i])
    if (typeof field[i] == 'string') {
      fields += field[i] + "\n";
    } else {
      for(var key in Object.keys(field[i])){
        console.log(key)
        var key1 = Object.keys(field[i])[0]
        // fields += `${key} {'
        fields += `${key1} {
          ${buildFields(field[i][key1])}
        }\n`
      }

    }
  }
  return fields;
}

export function dispatchGraphqlQuery(table_name, fields, variables) {
  // console.log(getHasuraToken())
  console.log(fields)
  const fields_str = buildFields(fields);
  const query = `query {
    ${table_name} {
      ${fields_str}
    }
  }`
  const client = new GraphQLClient(process.env.VUE_APP_BASE_API + "/graphql", {
    headers: {
      // headers
      Authorization: "Bearer " + getToken(),
      "x-hasura-token": getHasuraToken(),
      // OR "Access-Token": () => "some-access-token"
    },
  });
  console.log(query)
  return client.request(query, variables);
}


export function dispatchGraphqlQueryByPk(table_name, fields, variables) {
  // console.log(getHasuraToken())
  console.log(fields)
  const fields_str = buildFields(fields);
  const query = `query ($id: uuid!) {
    ${table_name}_by_pk (id: $id) {
      ${fields_str}
    }
  }`
  const client = new GraphQLClient(process.env.VUE_APP_BASE_API + "/graphql", {
    headers: {
      // headers
      Authorization: "Bearer " + getToken(),
      "x-hasura-token": getHasuraToken(),
      // OR "Access-Token": () => "some-access-token"
    },
  });
  console.log(query)
  return client.request(query, variables);
}



export function dispatchGraphqlMutation(table_name, fields, variables) {
  console.log(fields)
  const fields_str = buildFields(fields);
  var query = null
  if(variables.id === undefined) {
    variables = {
      "object": variables
    }
    query =  `mutation insert_single_${table_name}($object: ${table_name}_insert_input! ) {
      insert_${table_name}_one(object: $object) {
        ${fields_str}
      }
    }`
  }
  else {
    variables = {
      "id": variables.id,
      "changes": variables
    }
    query = `mutation update_${table_name} ($id: uuid!, $changes: ${table_name}_set_input!) {
      update_${table_name}_by_pk(pk_columns: { id: $id }, _set: $changes) {
        ${fields_str}
      }
    }`
  }

  const client = new GraphQLClient(process.env.VUE_APP_BASE_API + "/graphql", {
    headers: {
      // headers
      Authorization: "Bearer " + getToken(),
      "x-hasura-token": getHasuraToken(),
      // OR "Access-Token": () => "some-access-token"
    },
  });
  console.log(query)
  return client.request(query, variables);
}

export function dispatchGraphqlDelete(table_name, variables) {
  const mutation = `mutation ($id: uuid!) {
    delete_${table_name}_by_pk (id: $id) {
      id
    }
  }`
  const client = new GraphQLClient(process.env.VUE_APP_BASE_API + "/graphql", {
    headers: {
      Authorization: "Bearer " + getToken(),
      "x-hasura-token": getHasuraToken(),
    },
  });
  console.log(mutation)
  return client.request(mutation, variables);
}
