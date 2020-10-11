import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table, Unique } from 'sequelize-typescript'
import User from './user.model';

@Table({
  timestamps: true,
  paranoid: false,
  deletedAt: "deletionDate",
})
class Contact extends Model<Contact> {
  @AllowNull(false)
  @Column
  public first_name: string;

  @AllowNull(false)
  @Column
  public last_name: string;

  @AllowNull(false)
  @Unique
  @Column
  public phone: string;
  
  @ForeignKey(() => User)
  @Column
  public userId: number;

  @BelongsTo(() => User)
  user: User;
}

export default Contact;
