import { AllowNull, Column, HasMany, IsEmail, Model, Table, Unique } from 'sequelize-typescript'
import Contact from './contact.model';

@Table({
  timestamps: true,
  paranoid: true,
  deletedAt: "deletionDate",
})
class User extends Model<User> {
  @AllowNull(false)
  @Column
  public name: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column
  public email: string;

  @AllowNull(false)
  @Column
  public password: string;

  @HasMany(() => Contact)
  public contacts: Contact[];
}

export default User