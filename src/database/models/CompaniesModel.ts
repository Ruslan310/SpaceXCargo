import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';
import {tableSchema} from '@nozbe/watermelondb';
import {COMPANIES} from '../tables';
import {CompaniesColumns} from '../columns';

class CompaniesModel extends Model {
  static table = COMPANIES;

  @field(CompaniesColumns.name) name!: string;
  @field(CompaniesColumns.email) email!: string;
  @field(CompaniesColumns.boxes) boxes!: string;
}

const CompaniesSchema = tableSchema({
  name: COMPANIES,
  columns: [
    {name: CompaniesColumns.name, type: 'string', isOptional: false},
    {name: CompaniesColumns.email, type: 'string', isOptional: false},
    {name: CompaniesColumns.boxes, type: 'string', isOptional: true},
  ],
});

export {CompaniesModel, CompaniesSchema};
