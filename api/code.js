import { stringify } from 'querystring'
import axios from 'axios'

export default (request, response, next) => {
  response.status(200).send(request.query)
  // axios
  //   .post(
  //     `${process.env.OAUTH2_URL}/token`,
  //     stringify({
  //       client_id: process.env.CLIENT_ID,
  //       client_secret: process.env.CLIENT_SECRET,
  //       grant_type: 'authorization_code',
  //       code: req.query.code,
  //       redirect_uri: `${process.env.baseUrl}/login`,
  //       scope: 'identify'
  //     }),
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     }
  //   )
  //   .then(({ data }) => {
  //     res.status(200).json(data)
  //   })
  //   .catch((err) => {
  //     res.status(500).json(err.response.data)
  //   })
}
