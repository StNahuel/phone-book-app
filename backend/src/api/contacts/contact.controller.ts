import { Request, Response } from 'express';
import { where } from 'sequelize/types';
import Contact from '../../models/contact.model';
import { ResponseBody } from '../../utils/types';

export const createContact = async (req: Request, res: Response): Promise<Response<ResponseBody>> => {
  const { first_name, last_name, phone } = req.body;
  
  try {
    const contact = new Contact({
      first_name,
      last_name,
      phone
    });

    const newContact = await contact.save();

    return res.status(202).json({
      success: true,
      message: 'Contact created successfully.',
      data: newContact
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.toString()
    })
  }
}

export const getContacts = async (req: Request, res: Response): Promise<Response<ResponseBody>> => {
  try {
    const itemsPerPage = 20;
    let page: string = req.query.page+'';

    const contacts = await Contact.findAndCountAll({ 
      limit: itemsPerPage,
      offset: parseInt(page) * itemsPerPage,
      order: [
        ['first_name', 'ASC']
      ] 
    });
    return res.status(200).json({
      success: true,
      message: 'Contacts successfully fetched.',
      data: { 
        page_items: itemsPerPage,
        contacts,
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.toString(),
    })
  }
}


export const getContactById = async (req: Request, res: Response): Promise<Response<ResponseBody>> => {
  const { id } = req.params;

  try {

    const contact = await Contact.findOne({ where: { id }});

    if(contact) {
      return res.status(200).json({
        success: true,
        message: 'Contact fetched successfully.',
        data: contact
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.toString()
    })
  }
}

export const deleteContact = async (req: Request, res: Response): Promise<Response<ResponseBody>> => {
  const { id } = req.params;

  try {

    await Contact.destroy({ where: {id} });

    return res.status(200).json({
      success: true,
      message: 'Contact deleted successfully.',
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.toString()
    })
  }
}

export const updateContact = async (req: Request, res: Response): Promise<Response<ResponseBody>> => {
  const { id } = req.params;

  try {
    
    await Contact.update({ ...req.body }, { where: { id } });

    return res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.toString()
    })
  }
}