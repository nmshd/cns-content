import { SimpleLoggerFactory } from "@js-soft/simple-logger"
import { MailTest } from "./messages/Mail.test"
import { RequestMailTest } from "./messages/RequestMail.test"
import { RequestTest } from "./requests/Request.test"
import { ResponseTest } from "./requests/Response.test"

const loggerFactory = new SimpleLoggerFactory()

new MailTest(loggerFactory).run()
new RequestTest(loggerFactory).run()
new ResponseTest(loggerFactory).run()
new RequestMailTest(loggerFactory).run()
