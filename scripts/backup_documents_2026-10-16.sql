-- Backup of public.documents file_path values before the 2026-10-16 download fix.
-- Run this to restore the previous file_path values if needed.
update public.documents set file_path = 'adaptation-model-model-adaptatsia-1785411898478.pdf' where document_type = 'adaptation-model';
update public.documents set file_path = 'document-admission-rules.pdf' where document_type = 'admission-rules';
update public.documents set file_path = 'document-annual-plan.pdf' where document_type = 'annual-plan';
update public.documents set file_path = 'document-bdp-program.pdf' where document_type = 'bdp-program';
update public.documents set file_path = 'document-data-protection.pdf' where document_type = 'data-protection';
update public.documents set file_path = 'ethics-code-dg202-etichen-kodeks-dg202-1785411892827.pdf' where document_type = 'ethics-code-dg202';
update public.documents set file_path = 'ethics-code-general-etichen-kodeks-rabota-s-detsa-1785411883920.pdf' where document_type = 'ethics-code-general';
update public.documents set file_path = 'document-program-system.pdf' where document_type = 'program-system';
update public.documents set file_path = 'document-risk-mechanism.pdf' where document_type = 'risk-mechanism';
update public.documents set file_path = 'document-terror-protocol.pdf' where document_type = 'terror-protocol';
delete from public.documents where document_type = 'action-plan';
