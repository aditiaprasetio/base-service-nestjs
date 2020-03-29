import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1584697797169 implements MigrationInterface {
  name = 'InitDB1584697797169';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `examples` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `actions` text NOT NULL, `created_by_id` varchar(255) NOT NULL, `meta_created_by` json NULL, `meta` json NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE `examples`', undefined);
  }
}
