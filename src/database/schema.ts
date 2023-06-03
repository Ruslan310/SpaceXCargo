import {appSchema} from '@nozbe/watermelondb';
import {CompaniesSchema} from './models/CompaniesModel';

export default appSchema({
  version: 3,
  tables: [CompaniesSchema],
});
