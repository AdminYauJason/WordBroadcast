// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "content": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "title": "留言内容/回复内容",
    "label": "留言内容/回复内容"
  },
  "imgs": {
    "rules": [
      {
        "format": "array"
      },
      {
        "arrayType": "file"
      },
      {
        "maxLength": 6
      }
    ],
    "title": "图片列表",
    "label": "图片列表"
  },
  "contact": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "联系人",
    "label": "联系人"
  },
  "mobile": {
    "rules": [
      {
        "format": "string"
      },
      {
        "pattern": "^\\+?[0-9-]{3,20}$"
      }
    ],
    "title": "联系电话",
    "label": "联系电话"
  },
  "create_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "留言时间/回复留言时间",
    "label": "留言时间/回复留言时间"
  },
  "user_id": {
    "rules": [
      {
        "format": "string"
      }
    ]
  }
}

const enumConverter = {}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
