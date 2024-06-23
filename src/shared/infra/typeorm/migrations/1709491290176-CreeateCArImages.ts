import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreeateCArImages1709491290176 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cars_image',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true },
                    {
                        name: 'car_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKCarImage',
                        referencedTableName: 'cars',
                        referencedColumnNames: ['id'],
                        columnNames: ['car_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('cars_image');
    }
}