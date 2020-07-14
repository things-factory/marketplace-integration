import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@Index(
  'ix_bizplace-platform_0',
  (bizplacePlatform: BizplacePlatform) => [bizplacePlatform.domain, bizplacePlatform.name],
  { unique: true }
)
export class BizplacePlatform {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @Column()
  platform: string

  @Column()
  countryCode: string

  @Column({
    nullable: true
  })
  status: string

  @Column()
  name: string

  @Column({
    nullable: true
  })
  accessInfo: string

  @Column({
    nullable: true
  })
  accessToken: string

  @Column({
    nullable: true
  })
  refreshToken: string

  @Column({
    nullable: true
  })
  account: string

  @Column({
    nullable: true
  })
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User
}
