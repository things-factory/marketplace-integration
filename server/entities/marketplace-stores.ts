import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@Index(
  'ix_marketplace-store_0',
  (marketplaceStores: MarketplaceStores) => [marketplaceStores.domain, marketplaceStores.name],
  { unique: true }
)
export class MarketplaceStores {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  platform: string

  @Column({
    nullable: true
  })
  storeId: string

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
