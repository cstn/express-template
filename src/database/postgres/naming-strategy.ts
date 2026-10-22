import { Table } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

/**
 * A class that defines custom naming strategies for database schema elements such as primary keys,
 * unique constraints, indexes, and foreign keys. This class extends the SnakeNamingStrategy to provide
 * a consistent and predictable naming convention based on table names and column names.
 */
export class NamingStrategy extends SnakeNamingStrategy {
  private buildTableName(tableOrName: Table | string): string {
    return typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
  }

  override primaryKeyName(
    tableOrName: Table | string,
    columnNames: string[]
  ): string {
    return ['PK', this.buildTableName(tableOrName), ...columnNames]
      .filter(Boolean)
      .join('_');
  }

  override uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[]
  ): string {
    return ['UQ', this.buildTableName(tableOrName), ...columnNames]
      .filter(Boolean)
      .join('_');
  }

  override indexName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string
  ): string {
    return [
      'IX',
      this.buildTableName(tableOrName),
      ...columnNames,
      where?.replace(' ', ''),
    ]
      .filter(Boolean)
      .join('_');
  }

  override foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    _referencedTablePath?: string,
    _referencedColumnNames?: string[]
  ): string {
    return [
      'FK',
      this.buildTableName(tableOrName),
      ...columnNames,
      _referencedTablePath,
      _referencedColumnNames ? _referencedColumnNames : undefined,
    ]
      .filter(Boolean)
      .join('_');
  }
}
