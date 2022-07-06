import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointments1642454932966 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'provider',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'date',
                    type: 'timestamp with time zone',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments')
    }
}

/**
 * Linha do tempo
 *
 * 1ª semana: Agendamentos
 * 2ª semana: Usuários
 * (Novo dev) 3ª Edição Agendamentos
 * 4ª semana: Compras
 *
 * Evita quando mais devs estiverem trabalhando juntos, gerenciar a database
 */
