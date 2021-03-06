import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanages1602628121136 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'orphanages',
			columns:[
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment',
				},
				{
					name: 'name',
					type: 'vachar'
				},
				{
					name: 'latitude',
					type: 'decimal',
					scale: 10,
					precision: 2
				},
				{
					name: 'longitude',
					type: 'decimal',
					scale: 10,
					precision: 2
				},
				{
					name: 'about',
					type: 'text',
				},
				{
					name: 'instructions',
					type: 'text',
				},
				{
					name: 'opening_hours',
					type: 'vachar'
				},
				{
					name: 'open_on_weekends',
					type: 'boolean',
					default: false,
				}
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('orphanages');
	}
}
