import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import useForm from '../../hooks/useForm'
import { productSave } from '../../utils/validations'
import { getCategories, saveProduct } from '../../services/admin'
import Cropper from 'cropperjs'
import '../../../node_modules/cropperjs/dist/cropper.min.css'
import AdminLayout from '../../components/AdminLayout'

const ProductAdminCreate = props => {
    const history = useHistory();

    const [categories, setCategories] = useState([])
    const [source, setSource] = useState('')
    const [cropper, setCropper] = useState(null)

    const {
        data,
        errors,
        onChange,
        onCheckbox,
        hasErrors,
        onFileChange
    } = useForm(
        {
            name: '', description: '', category_id: '',
            price: 0.00, in_stock: 0, fileInput: ''
        },
        productSave
    );

    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data)
            })
    }, [])

    var img = useRef(null)

    const fileChanged = e => {
        onFileChange(e)

        var file    = e.target.files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", () => {
            if (cropper) cropper.destroy();

            setSource(reader.result);

            setTimeout(() => {
                crop()
            }, 500)

        }, false);

        reader.readAsDataURL(file);
    }

    function crop() {
        setCropper(new Cropper(img.current, {
            aspectRatio: 1,
            minCropBoxWidth: 300,
            minCropBoxHeight: 300,
            dragMode: 'move',
            preview: '.img-preview',
        }))
    }

    const submit = e => {
        e.preventDefault()

        if (hasErrors()) return

        return cropper.getCroppedCanvas().toBlob(blob => {
            saveProduct(null, getFormData(blob))
                .then(response => {
                    history.push(`/admin/products/${response.data.id}`);
                })
        })
    }

    const getFormData = (blob = null) => {
        let formData = new FormData()

        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('category_id', data.category_id)
        formData.append('in_stock', data.in_stock ? 1 : 0)
        formData.append('price', data.price)

        if (blob) {
            formData.append('extension', data.fileInput.type)
            formData.append('image', blob)
        }

        return formData
    }

    return (
        <AdminLayout>

            <div className="preview" style={{width: '500px', border: '2px solid #ccc'}}>
                { data.fileInput && <img ref={img} id="image" src={source} style={{ display: 'block', maxWidth: '100%'}} alt='Uploaded or cropping' /> }
            </div>

            <div className="img-preview overflow-hidden" style={{ width: '200px', height: '200px', border: '2px solid #ccc'}}></div>

            <form onSubmit={submit} id="forma">

                <div>
                    <label>name: </label>

                     <input className="form-control" id="pname" onChange={onChange} value={data.name} type="text" name="name" />

                    { errors.name && <p className="text-danger">{errors.name}</p> }

                </div>

                <div>
                    <label>description: </label>
                    <input className="form-control" onChange={onChange} value={data.description}  id="desc" type="text" name="description" />

                    { errors.description && <p className="text-danger">{errors.description}</p> }
                </div>

                <div>
                    <label>price: € </label>

                    <input className="form-control" onChange={onChange} value={data.price} type="number" id="price" name="price" />

                    { errors.price && <p className="text-danger">{errors.price}</p> }
                </div>

                <div>
                    <label>in_stock: </label>
                    <input className="ml-2" id="in_stock" type="checkbox"
                        onChange={onCheckbox}
                        checked={data.in_stock} name="in_stock" />

                    { errors.in_stock && <p className="text-danger">{errors.in_stock}</p> }
                </div>

                <div>
                    category_id:

                    <select className="form-control" name="category_id" onChange={onChange} value={data.category_id}>
                        <option value="0"></option>
                        {
                            categories.map((cat, i) => {
                                return <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            })
                        }
                    </select>

                    { errors.category_id && <p className="text-danger">{errors.category_id}</p> }
                </div>

                <div>
                    file: <input className="form-control" id="file" type="file" onChange={fileChanged} name="fileInput" />

                    { errors.fileInput && <p className="text-danger">{errors.fileInput}</p> }
                </div>

                <button onClick={submit}>submit</button>

            </form>
        </AdminLayout>
    )
}

export default ProductAdminCreate
