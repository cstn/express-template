import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * User account
 */
@Entity({ name: 'users', comment: 'User accounts' })
export class User {
  @PrimaryGeneratedColumn('uuid', { comment: 'User ID' })
  id!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Username',
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Email',
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'First name',
  })
  firstName!: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Last name',
  })
  lastName!: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Provider that created the user account',
  })
  issuer!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: 'External ID, auth sub',
  })
  @Index({ unique: true })
  externalId!: string;

  @Column({
    type: 'uuid',
    nullable: true,
    comment: 'User ID that created this user',
  })
  createdBy!: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  @Index()
  createdAt!: Date;

  @Column({
    type: 'uuid',
    nullable: true,
    comment: 'User ID that updated this user',
  })
  updatedBy!: string | null;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @Index()
  deletedAt!: Date | null;
}
