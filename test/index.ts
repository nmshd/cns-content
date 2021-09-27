import { SimpleLoggerFactory } from "@js-soft/simple-logger"
import { MailTest } from "./messages/Mail.test"
import { RequestMailTest } from "./messages/RequestMail.test"

const loggerFactory = new SimpleLoggerFactory()

new MailTest(loggerFactory).run()
new RequestMailTest(loggerFactory).run()
