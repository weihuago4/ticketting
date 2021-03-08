import { useState } from 'react'
import axios from 'axios'

const useRequest = ({ method, url, body, onSuccess }) => {
  const [errors, setErrors] = useState(null)

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body)
      setErrors(null)
      if(typeof onSuccess == 'function') {
        onSuccess(response.data)
      }
      return response.data
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {error.response.data.map(err => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )
    }
  }

  return { errors, doRequest }
}

export default useRequest